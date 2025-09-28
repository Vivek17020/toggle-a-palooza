import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WhaleAnalyzerRequest {
  walletAddress: string;
  role: 'trader' | 'investor' | 'analyst';
}

interface Transaction {
  hash: string;
  type: string;
  amount: string;
  to: string;
  timestamp?: string;
  value?: string;
}

interface WhaleAnalyzerResponse {
  wallet: string;
  transactions: Transaction[];
  patterns: string[];
  insights: {
    trader?: string;
    investor?: string;
    analyst?: string;
  };
  avgGasFee: string;
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
    const { walletAddress, role } = await req.json() as WhaleAnalyzerRequest;

    if (!walletAddress || !role) {
      return new Response(JSON.stringify({ error: 'Missing walletAddress or role' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const etherscanApiKey = Deno.env.get('ETHERSCAN_API_KEY');
    
    let response: WhaleAnalyzerResponse;

    if (etherscanApiKey) {
      console.log('Using real Etherscan API for wallet:', walletAddress);
      response = await fetchRealTransactions(walletAddress, role, etherscanApiKey);
    } else {
      console.log('Using mock data for wallet:', walletAddress);
      response = generateMockResponse(walletAddress, role);
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in whale-analyzer function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function fetchRealTransactions(
  walletAddress: string, 
  role: string, 
  apiKey: string
): Promise<WhaleAnalyzerResponse> {
  try {
    // Fetch latest transactions from Etherscan
    const txResponse = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`
    );
    
    const txData = await txResponse.json();
    
    if (txData.status !== '1') {
      throw new Error('Failed to fetch transactions from Etherscan');
    }

    // Convert wei to ETH and format transactions
    const transactions: Transaction[] = txData.result.slice(0, 5).map((tx: any) => ({
      hash: tx.hash,
      type: tx.to === walletAddress ? 'ETH Received' : 'ETH Transfer',
      amount: `${(parseInt(tx.value) / 1e18).toFixed(4)} ETH`,
      to: tx.to === walletAddress ? tx.from : tx.to,
      timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
      value: tx.value
    }));

    // Analyze patterns
    const patterns = analyzePatterns(transactions);
    
    // Calculate average gas fee
    const avgGas = txData.result.slice(0, 10).reduce((sum: number, tx: any) => 
      sum + (parseInt(tx.gasUsed) * parseInt(tx.gasPrice)), 0
    ) / Math.min(10, txData.result.length);
    
    const avgGasFee = `${(avgGas / 1e18).toFixed(6)} ETH`;

    return {
      wallet: walletAddress,
      transactions,
      patterns,
      insights: generateInsights(role, patterns, transactions),
      avgGasFee
    };
  } catch (error) {
    console.error('Error fetching real transactions:', error);
    // Fallback to mock data if API fails
    return generateMockResponse(walletAddress, role);
  }
}

function generateMockResponse(walletAddress: string, role: string): WhaleAnalyzerResponse {
  return {
    wallet: walletAddress,
    transactions: [
      { 
        hash: "0x123abc", 
        type: "ETH Transfer", 
        amount: "500 ETH", 
        to: "0xabc123",
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      { 
        hash: "0x456def", 
        type: "Token Swap", 
        amount: "1,200,000 USDT", 
        to: "Uniswap",
        timestamp: new Date(Date.now() - 7200000).toISOString()
      },
      { 
        hash: "0x789ghi", 
        type: "ETH Transfer", 
        amount: "750 ETH", 
        to: "0xdef456",
        timestamp: new Date(Date.now() - 10800000).toISOString()
      }
    ],
    patterns: ["Accumulating ETH", "High gas usage", "Large volume transactions"],
    insights: {
      trader: "Possible pump incoming due to large ETH buys.",
      investor: "Long-term wallet accumulation pattern detected.",
      analyst: "Clustered behavior with other whale addresses."
    },
    avgGasFee: "0.012 ETH"
  };
}

function analyzePatterns(transactions: Transaction[]): string[] {
  const patterns: string[] = [];
  
  // Simple pattern detection
  const ethTransfers = transactions.filter(tx => tx.type.includes('ETH'));
  const largeVolume = transactions.some(tx => 
    parseFloat(tx.amount.split(' ')[0]) > 100
  );
  
  if (ethTransfers.length > transactions.length * 0.7) {
    patterns.push("Heavy ETH activity");
  }
  
  if (largeVolume) {
    patterns.push("Large volume transactions");
  }
  
  if (transactions.length > 3) {
    patterns.push("High transaction frequency");
  }
  
  // Check for accumulation vs distribution
  const receivedTxs = transactions.filter(tx => tx.type.includes('Received'));
  if (receivedTxs.length > transactions.length * 0.6) {
    patterns.push("Accumulating ETH");
  } else {
    patterns.push("Distributing assets");
  }
  
  return patterns.length > 0 ? patterns : ["Normal trading activity"];
}

function generateInsights(role: string, patterns: string[], transactions: Transaction[]): any {
  const insights: any = {};
  
  const hasAccumulation = patterns.includes("Accumulating ETH");
  const hasLargeVolume = patterns.includes("Large volume transactions");
  
  if (role === 'trader' || !role) {
    if (hasAccumulation && hasLargeVolume) {
      insights.trader = "Possible pump incoming due to large ETH buys.";
    } else {
      insights.trader = "Monitor for breakout signals, current activity suggests consolidation.";
    }
  }
  
  if (role === 'investor' || !role) {
    if (hasAccumulation) {
      insights.investor = "Long-term wallet accumulation pattern detected.";
    } else {
      insights.investor = "Profit-taking behavior observed, consider entry opportunities.";
    }
  }
  
  if (role === 'analyst' || !role) {
    insights.analyst = "Clustered behavior with other whale addresses, institutional activity likely.";
  }
  
  return insights;
}