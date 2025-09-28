import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  title: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  source: string;
  url: string;
  description?: string;
  publishedAt?: string;
}

export interface NewsAgentResponse {
  articles: NewsArticle[];
  themes: string[];
  insights: {
    trader?: string;
    investor?: string;
    analyst?: string;
  };
  queryType: 'news';
  role: string;
}

export interface OrchestratorResponse {
  role: string;
  queryType: 'whale' | 'news' | 'combined' | 'general';
  response: string;
  data?: {
    newsData?: NewsAgentResponse;
    whaleData?: any;
  };
}

/**
 * Calls the AI News Agent through the orchestrator
 */
export const callNewsAgent = async (
  message: string, 
  userRole: 'trader' | 'investor' | 'analyst'
): Promise<OrchestratorResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('orchestrator', {
      body: {
        message,
        userRole,
      },
    });

    if (error) {
      console.error('News agent error:', error);
      throw new Error(error.message || 'Failed to call news agent');
    }

    return data;
  } catch (error) {
    console.error('Error calling news agent:', error);
    
    // Fallback with structured mock data
    return {
      role: userRole,
      queryType: 'news',
      response: generateFallbackResponse(userRole),
      data: {
        newsData: {
          articles: generateMockArticles(),
          themes: ['Market Volatility', 'Regulation', 'DeFi'],
          insights: generateMockInsights(userRole),
          queryType: 'news',
          role: userRole,
        }
      }
    };
  }
};

/**
 * Formats news response for display in chat
 */
export const formatNewsResponse = (response: OrchestratorResponse): string => {
  if (!response.data?.newsData) {
    return response.response;
  }

  const { articles, themes, insights } = response.data.newsData;
  const roleInsight = insights[response.role as keyof typeof insights];
  
  let formatted = `📰 **Crypto News Analysis**\n\n`;
  formatted += `**Key Themes:** ${themes.join(', ')}\n`;
  formatted += `**Articles Analyzed:** ${articles.length}\n\n`;
  
  if (roleInsight) {
    formatted += `**${response.role.charAt(0).toUpperCase() + response.role.slice(1)} Insight:** ${roleInsight}\n\n`;
  }
  
  formatted += `**Top Headlines:**\n`;
  articles.slice(0, 3).forEach((article, index) => {
    const sentimentEmoji = article.sentiment === 'bullish' ? '🟢' : 
                           article.sentiment === 'bearish' ? '🔴' : '🟡';
    formatted += `${index + 1}. ${sentimentEmoji} [${article.sentiment.toUpperCase()}] ${article.title} - ${article.source}\n`;
  });
  
  return formatted;
};

function generateFallbackResponse(role: string): string {
  const responses = {
    trader: "📊 Market sentiment shows mixed signals. Monitor for breakout patterns in major cryptocurrencies.",
    investor: "📈 Long-term outlook remains positive despite short-term volatility. Consider DCA strategies.",
    analyst: "🔍 Market narrative shifting toward regulatory clarity and institutional adoption trends."
  };
  
  return responses[role as keyof typeof responses] || "📰 Crypto news analysis temporarily unavailable.";
}

function generateMockArticles(): NewsArticle[] {
  return [
    {
      title: "Bitcoin ETF Approval Signals Institutional Adoption",
      sentiment: "bullish",
      source: "CoinDesk",
      url: "https://coindesk.com/bitcoin-etf-approval",
      description: "Major milestone for cryptocurrency mainstream adoption.",
      publishedAt: new Date().toISOString()
    },
    {
      title: "SEC Regulatory Framework Creates Market Uncertainty",
      sentiment: "bearish", 
      source: "Bloomberg",
      url: "https://bloomberg.com/sec-framework",
      description: "New regulations may impact cryptocurrency trading.",
      publishedAt: new Date().toISOString()
    },
    {
      title: "Ethereum Layer 2 Solutions Show Strong Growth",
      sentiment: "neutral",
      source: "The Block",
      url: "https://theblock.co/layer2-growth",
      description: "Scaling solutions demonstrate increasing adoption.",
      publishedAt: new Date().toISOString()
    }
  ];
}

function generateMockInsights(role: string) {
  return {
    trader: "Short-term volatility expected, watch for support levels around key resistance zones.",
    investor: "Regulatory developments create long-term value opportunities in established projects.",
    analyst: "Market consolidation phase indicates potential for next major trend cycle initiation."
  };
}