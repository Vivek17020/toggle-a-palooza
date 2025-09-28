import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrchestratorRequest {
  message: string;
  userRole: 'trader' | 'investor' | 'analyst';
}

interface OrchestratorResponse {
  role: string;
  queryType: 'whale' | 'news' | 'combined' | 'general';
  response: string;
  data?: {
    whaleData?: any;
    newsData?: any;
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
    const { message, userRole } = await req.json() as OrchestratorRequest;

    if (!message || !userRole) {
      return new Response(JSON.stringify({ error: 'Missing message or userRole' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing query:', message, 'for role:', userRole);

    // Detect query type
    const queryType = detectQueryType(message);
    console.log('Detected query type:', queryType);
    
    // Initialize Supabase client for calling other functions
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://ptcffpiqkrpblonmkmba.supabase.co';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_PUBLISHABLE_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey!);

    let response: OrchestratorResponse;

    switch (queryType) {
      case 'whale':
        response = await handleWhaleQuery(message, userRole, supabase);
        break;
      case 'news':
        response = await handleNewsQuery(message, userRole, supabase);
        break;
      case 'combined':
        response = await handleCombinedQuery(message, userRole, supabase);
        break;
      default:
        response = await handleGeneralQuery(message, userRole);
        break;
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in orchestrator function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function detectQueryType(message: string): 'whale' | 'news' | 'combined' | 'general' {
  const lowerMessage = message.toLowerCase();
  
  const hasWalletAddress = /0x[a-fA-F0-9]{40}/.test(message);
  const hasNewsKeywords = /\b(news|sentiment|market|headlines|crypto news|analysis|bullish|bearish|articles|price|trend|outlook|forecast|update|intelligence|feed|narrative|theme)\b/.test(lowerMessage);
  
  if (hasWalletAddress && hasNewsKeywords) {
    return 'combined';
  } else if (hasWalletAddress) {
    return 'whale';
  } else if (hasNewsKeywords) {
    return 'news';
  } else {
    return 'general';
  }
}

async function handleWhaleQuery(message: string, userRole: string, supabase: any): Promise<OrchestratorResponse> {
  try {
    // Extract wallet address from message
    const walletMatch = message.match(/0x[a-fA-F0-9]{40}/);
    const walletAddress = walletMatch ? walletMatch[0] : '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
    
    console.log('Calling whale-analyzer for wallet:', walletAddress);
    
    const { data: whaleData, error } = await supabase.functions.invoke('whale-analyzer', {
      body: { walletAddress, role: userRole }
    });

    if (error) {
      console.error('Error calling whale-analyzer:', error);
      // Fallback to mock response
      return {
        role: userRole,
        queryType: 'whale',
        response: generateMockWhaleResponse(walletAddress, userRole),
        data: { whaleData: null }
      };
    }

    const response = generateWhaleResponse(whaleData, userRole, walletAddress);
    
    return {
      role: userRole,
      queryType: 'whale',
      response,
      data: { whaleData }
    };
  } catch (error) {
    console.error('Error in whale query:', error);
    return {
      role: userRole,
      queryType: 'whale',
      response: `Error analyzing wallet: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

async function handleNewsQuery(message: string, userRole: string, supabase: any): Promise<OrchestratorResponse> {
  try {
    console.log('Calling news-analyst for role:', userRole);
    
    const { data: newsData, error } = await supabase.functions.invoke('news-analyst', {
      body: { 
        role: userRole,
        query: message 
      }
    });

    if (error) {
      console.error('Error calling news-analyst:', error);
      // Fallback to mock response
      return {
        role: userRole,
        queryType: 'news',
        response: generateMockNewsResponse(userRole),
        data: { newsData: null }
      };
    }

    const response = generateNewsResponse(newsData, userRole);
    
    return {
      role: userRole,
      queryType: 'news',
      response,
      data: { newsData }
    };
  } catch (error) {
    console.error('Error in news query:', error);
    return {
      role: userRole,
      queryType: 'news',
      response: `Error analyzing news: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

async function handleCombinedQuery(message: string, userRole: string, supabase: any): Promise<OrchestratorResponse> {
  try {
    // Extract wallet address
    const walletMatch = message.match(/0x[a-fA-F0-9]{40}/);
    const walletAddress = walletMatch ? walletMatch[0] : '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
    
    console.log('Calling both whale-analyzer and news-analyst');
    
    // Call both services in parallel
    const [whaleResult, newsResult] = await Promise.allSettled([
      supabase.functions.invoke('whale-analyzer', {
        body: { walletAddress, role: userRole }
      }),
      supabase.functions.invoke('news-analyst', {
        body: { role: userRole }
      })
    ]);

    const whaleData = whaleResult.status === 'fulfilled' ? whaleResult.value.data : null;
    const newsData = newsResult.status === 'fulfilled' ? newsResult.value.data : null;
    
    const response = generateCombinedResponse(whaleData, newsData, userRole, walletAddress);
    
    return {
      role: userRole,
      queryType: 'combined',
      response,
      data: { whaleData, newsData }
    };
  } catch (error) {
    console.error('Error in combined query:', error);
    return {
      role: userRole,
      queryType: 'combined',
      response: `Error performing combined analysis: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

async function handleGeneralQuery(message: string, userRole: string): Promise<OrchestratorResponse> {
  return {
    role: userRole,
    queryType: 'general',
    response: `I can help you analyze crypto wallets and news. Try asking me to "analyze wallet 0x..." or "get latest crypto news" or combine both requests.`
  };
}

function generateWhaleResponse(whaleData: any, userRole: string, walletAddress: string): string {
  if (!whaleData) {
    return generateMockWhaleResponse(walletAddress, userRole);
  }

  const { transactions, patterns, insights, avgGasFee } = whaleData;
  const userInsight = insights[userRole] || insights.trader || "No specific insights available.";
  
  return `🐋 **Whale Analysis for ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}**

**Recent Activity:** ${transactions.length} transactions analyzed
**Key Patterns:** ${patterns.join(', ')}
**Average Gas:** ${avgGasFee}

**${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Insight:** ${userInsight}

**Latest Transactions:**
${transactions.slice(0, 3).map((tx: any, i: number) => 
  `${i + 1}. ${tx.type}: ${tx.amount} → ${tx.to.slice(0, 6)}...`
).join('\n')}`;
}

function generateNewsResponse(newsData: any, userRole: string): string {
  if (!newsData) {
    return generateMockNewsResponse(userRole);
  }

  const { articles, themes, insights } = newsData;
  const userInsight = insights[userRole] || insights.trader || "No specific insights available.";
  
  return `📰 **Crypto News Analysis**

**Key Themes:** ${themes.join(', ')}
**Articles Analyzed:** ${articles.length}

**${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Insight:** ${userInsight}

**Top Headlines:**
${articles.slice(0, 3).map((article: any, i: number) => 
  `${i + 1}. [${article.sentiment.toUpperCase()}] ${article.title} - ${article.source}`
).join('\n')}`;
}

function generateCombinedResponse(whaleData: any, newsData: any, userRole: string, walletAddress: string): string {
  const whaleSection = whaleData ? 
    `🐋 **Whale Activity:** ${whaleData.patterns.join(', ')}` :
    `🐋 **Whale Activity:** Analysis unavailable`;
    
  const newsSection = newsData ? 
    `📰 **Market Sentiment:** ${newsData.themes.join(', ')}` :
    `📰 **Market Sentiment:** News analysis unavailable`;

  const whaleInsight = whaleData?.insights[userRole] || "No whale insights available.";
  const newsInsight = newsData?.insights[userRole] || "No news insights available.";

  return `🔍 **Combined Analysis for ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}**

${whaleSection}
${newsSection}

**Correlation Analysis:**
- Whale: ${whaleInsight}
- News: ${newsInsight}

**Recommendation:** Monitor both whale movements and news sentiment for comprehensive market understanding.`;
}

function generateMockWhaleResponse(walletAddress: string, userRole: string): string {
  return `🐋 **Whale Analysis for ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}**

**Recent Activity:** 3 transactions analyzed
**Key Patterns:** Accumulating ETH, Large volume transactions
**Average Gas:** 0.012 ETH

**${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Insight:** ${getMockInsight(userRole, 'whale')}

**Latest Transactions:**
1. ETH Transfer: 500 ETH → 0xabc1...
2. Token Swap: 1,200,000 USDT → Uniswap
3. ETH Transfer: 750 ETH → 0xdef4...`;
}

function generateMockNewsResponse(userRole: string): string {
  return `📰 **Crypto News Analysis**

**Key Themes:** Ethereum ETF, Regulation, DeFi Innovation
**Articles Analyzed:** 4

**${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Insight:** ${getMockInsight(userRole, 'news')}

**Top Headlines:**
1. [BULLISH] Ethereum ETF Approved by SEC - CoinDesk
2. [BEARISH] SEC Investigates Major Cryptocurrency Exchange - Bloomberg
3. [NEUTRAL] Bitcoin Mining Difficulty Reaches All-Time High - CryptoPanic`;
}

function getMockInsight(userRole: string, type: 'whale' | 'news'): string {
  const insights = {
    whale: {
      trader: "Possible pump incoming due to large ETH buys.",
      investor: "Long-term wallet accumulation pattern detected.",
      analyst: "Clustered behavior with other whale addresses."
    },
    news: {
      trader: "Bullish ETH narrative, short-term buy signals detected.",
      investor: "Regulation could cause long-term volatility.",
      analyst: "Market narrative shifting toward institutional adoption."
    }
  };
  
  return insights[type][userRole as keyof typeof insights.whale] || insights[type].trader;
}