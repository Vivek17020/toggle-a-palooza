import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsAnalystRequest {
  role: 'trader' | 'investor' | 'analyst';
  query?: string;
}

interface Article {
  title: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  source: string;
  url: string;
  description?: string;
  publishedAt?: string;
}

interface NewsAnalystResponse {
  articles: Article[];
  themes: string[];
  insights: {
    trader?: string;
    investor?: string;
    analyst?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { role, query } = await req.json() as NewsAnalystRequest;

    if (!role) {
      return new Response(JSON.stringify({ error: 'Missing role parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const newsApiKey = Deno.env.get('NEWS_API_KEY');
    
    let response: NewsAnalystResponse;

    if (newsApiKey) {
      console.log('Using real News API for role:', role, 'query:', query);
      response = await fetchRealNews(role, newsApiKey, query);
    } else {
      console.log('Using mock news data for role:', role, 'query:', query);
      response = generateMockResponse(role);
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in news-analyst function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function fetchRealNews(role: string, apiKey: string, query?: string): Promise<NewsAnalystResponse> {
  try {
    // Build search query based on user input or default crypto terms
    let searchQuery = 'cryptocurrency OR bitcoin OR ethereum OR crypto';
    if (query) {
      // Extract relevant crypto terms from user query
      const cryptoTerms = extractCryptoTermsFromQuery(query);
      if (cryptoTerms.length > 0) {
        searchQuery = cryptoTerms.join(' OR ') + ' AND (' + searchQuery + ')';
      }
    }
    
    // Fetch crypto news from NewsAPI
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch news from NewsAPI');
    }

    // Process articles and analyze sentiment
    const articles: Article[] = data.articles.slice(0, 6).map((article: any) => ({
      title: article.title,
      sentiment: analyzeSentiment(article.title + ' ' + (article.description || '')),
      source: article.source.name,
      url: article.url,
      description: article.description,
      publishedAt: article.publishedAt
    }));

    // Extract themes from titles and descriptions
    const themes = extractThemes(articles);
    
    // Generate insights based on articles and role
    const insights = generateInsights(role, articles, themes);

    return {
      articles,
      themes,
      insights
    };
  } catch (error) {
    console.error('Error fetching real news:', error);
    // Fallback to mock data if API fails
    return generateMockResponse(role);
  }
}

function generateMockResponse(role: string): NewsAnalystResponse {
  const mockArticles: Article[] = [
    {
      title: "Ethereum ETF Approved by SEC",
      sentiment: "bullish",
      source: "CoinDesk",
      url: "https://coindesk.com/ethereum-etf-approved",
      description: "Major breakthrough for institutional adoption as SEC approves first Ethereum ETF."
    },
    {
      title: "SEC Investigates Major Cryptocurrency Exchange",
      sentiment: "bearish",
      source: "Bloomberg",
      url: "https://bloomberg.com/sec-investigation",
      description: "Regulatory scrutiny intensifies as SEC launches investigation into leading exchange."
    },
    {
      title: "Bitcoin Mining Difficulty Reaches All-Time High",
      sentiment: "neutral",
      source: "CryptoPanic",
      url: "https://cryptopanic.com/mining-difficulty",
      description: "Network security strengthens as mining difficulty adjustment reaches new record."
    },
    {
      title: "DeFi Protocol Launches Revolutionary Yield Strategy",
      sentiment: "bullish",
      source: "DeFiPulse",
      url: "https://defipulse.com/yield-strategy",
      description: "New protocol promises sustainable high yields through innovative staking mechanism."
    }
  ];

  return {
    articles: mockArticles,
    themes: ["Ethereum ETF", "Regulation", "DeFi Innovation", "Bitcoin Mining"],
    insights: generateInsights(role, mockArticles, ["Ethereum ETF", "Regulation", "DeFi Innovation"])
  };
}

function analyzeSentiment(text: string): 'bullish' | 'bearish' | 'neutral' {
  const lowerText = text.toLowerCase();
  
  const bullishKeywords = [
    'approval', 'approved', 'etf', 'adoption', 'surge', 'rally', 'breakout', 
    'bullish', 'positive', 'growth', 'launch', 'partnership', 'investment',
    'breakthrough', 'innovation', 'revolutionary', 'record high'
  ];
  
  const bearishKeywords = [
    'investigation', 'sec', 'regulation', 'crash', 'drop', 'decline', 'bearish',
    'negative', 'lawsuit', 'hack', 'exploit', 'concern', 'warning', 'ban',
    'scrutiny', 'crackdown', 'fraud', 'scam'
  ];
  
  const bullishScore = bullishKeywords.reduce((score, keyword) => 
    score + (lowerText.includes(keyword) ? 1 : 0), 0
  );
  
  const bearishScore = bearishKeywords.reduce((score, keyword) => 
    score + (lowerText.includes(keyword) ? 1 : 0), 0
  );
  
  if (bullishScore > bearishScore) return 'bullish';
  if (bearishScore > bullishScore) return 'bearish';
  return 'neutral';
}

function extractThemes(articles: Article[]): string[] {
  const themes = new Set<string>();
  
  const themeKeywords = {
    'ETF': ['etf', 'exchange-traded fund'],
    'Regulation': ['sec', 'regulation', 'regulatory', 'compliance', 'investigation'],
    'DeFi': ['defi', 'decentralized finance', 'yield', 'liquidity', 'protocol'],
    'Bitcoin': ['bitcoin', 'btc', 'mining', 'halving'],
    'Ethereum': ['ethereum', 'eth', 'staking', 'merge', 'layer 2'],
    'Institutional Adoption': ['institutional', 'corporate', 'enterprise', 'adoption'],
    'Market Analysis': ['price', 'market', 'trading', 'volume', 'volatility'],
    'Technology': ['blockchain', 'smart contract', 'consensus', 'node']
  };
  
  const allText = articles.map(article => 
    `${article.title} ${article.description || ''}`
  ).join(' ').toLowerCase();
  
  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    if (keywords.some(keyword => allText.includes(keyword))) {
      themes.add(theme);
    }
  });
  
  return Array.from(themes).slice(0, 5);
}

function generateInsights(
  role: string, 
  articles: Article[], 
  themes: string[]
): { trader?: string; investor?: string; analyst?: string } {
  const insights: any = {};
  
  const sentimentCounts = articles.reduce((counts, article) => {
    counts[article.sentiment]++;
    return counts;
  }, { bullish: 0, bearish: 0, neutral: 0 });
  
  const overallSentiment = sentimentCounts.bullish > sentimentCounts.bearish ? 'bullish' : 
                          sentimentCounts.bearish > sentimentCounts.bullish ? 'bearish' : 'neutral';
  
  if (role === 'trader' || !role) {
    if (overallSentiment === 'bullish' && themes.includes('ETF')) {
      insights.trader = "Bullish ETH narrative, short-term buy signals detected.";
    } else if (overallSentiment === 'bearish' && themes.includes('Regulation')) {
      insights.trader = "Regulatory concerns creating selling pressure, consider short positions.";
    } else {
      insights.trader = `Market sentiment is ${overallSentiment}, monitor for breakout signals.`;
    }
  }
  
  if (role === 'investor' || !role) {
    if (themes.includes('Regulation')) {
      insights.investor = "Regulation could cause long-term volatility, maintain diversified portfolio.";
    } else if (themes.includes('Institutional Adoption')) {
      insights.investor = "Institutional adoption trend supports long-term value thesis.";
    } else {
      insights.investor = `Current themes suggest ${overallSentiment} long-term outlook.`;
    }
  }
  
  if (role === 'analyst' || !role) {
    const mainTheme = themes[0] || 'Market Dynamics';
    insights.analyst = `Market narrative shifting toward ${mainTheme.toLowerCase()}, monitor regulatory developments.`;
  }
  
  return insights;
}

function extractCryptoTermsFromQuery(query: string): string[] {
  const cryptoKeywords = [
    'bitcoin', 'btc', 'ethereum', 'eth', 'dogecoin', 'doge', 'cardano', 'ada',
    'polkadot', 'dot', 'chainlink', 'link', 'litecoin', 'ltc', 'solana', 'sol',
    'polygon', 'matic', 'avalanche', 'avax', 'cosmos', 'atom', 'algorand', 'algo',
    'stellar', 'xlm', 'vechain', 'vet', 'tron', 'trx', 'eos', 'xrp', 'ripple',
    'binance', 'bnb', 'uniswap', 'uni', 'pancakeswap', 'cake', 'sushiswap', 'sushi',
    'defi', 'nft', 'web3', 'metaverse', 'dao', 'yield farming', 'staking',
    'regulation', 'sec', 'etf', 'institutional', 'adoption', 'halving', 'mining'
  ];
  
  const lowerQuery = query.toLowerCase();
  return cryptoKeywords.filter(keyword => 
    lowerQuery.includes(keyword) || lowerQuery.includes(keyword.replace(/\s+/g, ''))
  );
}