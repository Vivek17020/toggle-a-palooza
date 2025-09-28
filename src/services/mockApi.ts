// Mock API services simulating backend endpoints

export interface WhaleTransaction {
  id: string;
  address: string;
  amount: number;
  token: string;
  type: 'buy' | 'sell';
  timestamp: string;
  value_usd: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  source: string;
  timestamp: string;
  impact_score: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change_24h: number;
  volume_24h: number;
  market_cap: number;
}

// Mock whale analyzer data
export const mockWhaleTransactions: WhaleTransaction[] = [
  {
    id: '1',
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    amount: 50000,
    token: 'ETH',
    type: 'buy',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    value_usd: 125000000
  },
  {
    id: '2',
    address: '0x2f9840a85d5af5bf1d1762f925bdaddc4201f985',
    amount: 1000000,
    token: 'USDC',
    type: 'sell',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    value_usd: 1000000
  },
  {
    id: '3',
    address: '0x3f9840a85d5af5bf1d1762f925bdaddc4201f986',
    amount: 25000,
    token: 'BTC',
    type: 'buy',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    value_usd: 1100000000
  }
];

// Mock news data
export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Major Institutional Adoption of Ethereum Staking',
    summary: 'Large financial institutions are increasing their Ethereum staking positions, signaling strong confidence in the network.',
    sentiment: 'positive',
    source: 'CryptoNews',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    impact_score: 8.5
  },
  {
    id: '2',
    title: 'Bitcoin Whale Activity Surges Amid Market Volatility',
    summary: 'On-chain data shows significant whale movements as Bitcoin experiences increased volatility.',
    sentiment: 'neutral',
    source: 'BlockchainInsider',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    impact_score: 7.2
  },
  {
    id: '3',
    title: 'DeFi Protocol Launches New Yield Farming Opportunities',
    summary: 'A leading DeFi protocol announces new high-yield farming opportunities with enhanced security measures.',
    sentiment: 'positive',
    source: 'DeFiPulse',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    impact_score: 6.8
  }
];

// Mock market data
export const mockMarketData: MarketData[] = [
  {
    symbol: 'BTC',
    price: 44250.67,
    change_24h: 2.45,
    volume_24h: 28500000000,
    market_cap: 867000000000
  },
  {
    symbol: 'ETH',
    price: 2485.33,
    change_24h: -1.23,
    volume_24h: 15200000000,
    market_cap: 298000000000
  },
  {
    symbol: 'BNB',
    price: 315.45,
    change_24h: 0.87,
    volume_24h: 1800000000,
    market_cap: 47200000000
  }
];

// API simulation functions
export const whaleAnalyzer = {
  async getRecentTransactions(): Promise<WhaleTransaction[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockWhaleTransactions;
  },

  async analyzeWallet(address: string): Promise<{ totalValue: number; riskScore: number }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      totalValue: Math.random() * 10000000,
      riskScore: Math.random() * 10
    };
  }
};

export const newsAnalyst = {
  async getLatestNews(): Promise<NewsItem[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockNews;
  },

  async analyzeSentiment(): Promise<{ overall: string; score: number }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      overall: 'positive',
      score: 7.2
    };
  }
};

export const orchestrator = {
  async getMarketOverview(): Promise<MarketData[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockMarketData;
  },

  async generateInsights(): Promise<{ insights: string[]; recommendations: string[] }> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      insights: [
        'Whale activity suggests accumulation phase for major cryptocurrencies',
        'News sentiment remains positive despite market volatility',
        'Institutional adoption continues to drive long-term trends'
      ],
      recommendations: [
        'Monitor large wallet movements for early trend signals',
        'Consider dollar-cost averaging during volatility periods',
        'Keep attention on DeFi yield opportunities'
      ]
    };
  }
};