import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  Wallet, 
  Activity, 
  DollarSign,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data for charts
const ethTransactionData = [
  { time: '00:00', transactions: 12, volume: 2400 },
  { time: '04:00', transactions: 19, volume: 1398 },
  { time: '08:00', transactions: 35, volume: 9800 },
  { time: '12:00', transactions: 27, volume: 3908 },
  { time: '16:00', transactions: 42, volume: 4800 },
  { time: '20:00', transactions: 38, volume: 3800 },
  { time: '24:00', transactions: 31, volume: 4300 },
];

const sentimentData = [
  { name: 'Bullish', value: 70, color: '#10b981' },
  { name: 'Neutral', value: 20, color: '#6b7280' },
  { name: 'Bearish', value: 10, color: '#ef4444' },
];

const recentTransactions = [
  { id: 1, wallet: '0xd8da6bf...45', amount: '1,250 ETH', value: '$3.1M', type: 'buy', timestamp: '2 min ago' },
  { id: 2, wallet: '0x742d35c...89', amount: '2,800 ETH', value: '$7.0M', type: 'sell', timestamp: '5 min ago' },
  { id: 3, wallet: '0xa0b86a3...12', amount: '950 ETH', value: '$2.4M', type: 'buy', timestamp: '8 min ago' },
  { id: 4, wallet: '0x8ba1f1d...67', amount: '1,750 ETH', value: '$4.4M', type: 'buy', timestamp: '12 min ago' },
  { id: 5, wallet: '0x47ac0fb...34', amount: '3,200 ETH', value: '$8.0M', type: 'sell', timestamp: '15 min ago' },
];

const topWalletData = [
  { wallet: 'Wallet A', balance: 45000, percentage: 25 },
  { wallet: 'Wallet B', balance: 38000, percentage: 21 },
  { wallet: 'Wallet C', balance: 32000, percentage: 18 },
  { wallet: 'Wallet D', balance: 28000, percentage: 16 },
  { wallet: 'Others', balance: 36000, percentage: 20 },
];

export default function AikikoDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Aikiko Dashboard</h1>
              <p className="text-muted-foreground">Real-time crypto intelligence and whale tracking</p>
            </div>
            <div className="flex gap-3">
              <Link to="/aikiko">
                <Button 
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Chat Interface
                </Button>
              </Link>
              <Link to="/project-details">
                <Button 
                  variant="outline" 
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Project Details
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Stat Cards */}
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Whale Wallets</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12% from last week
                  </span>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Large Transactions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-orange-600 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -3% from yesterday
                  </span>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Bullish</div>
                <p className="text-xs text-muted-foreground">
                  70% positive sentiment
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24.9M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8% from last 24h
                  </span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* ETH Transaction Chart */}
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  ETH Transaction Volume (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ethTransactionData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="time" 
                      fontSize={12}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      fontSize={12}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="transactions" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sentiment Pie Chart */}
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Sentiment Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Bottom Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Recent Transactions */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Large Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${tx.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                          <p className="font-medium text-sm">{tx.wallet}</p>
                          <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{tx.amount}</p>
                        <p className="text-xs text-muted-foreground">{tx.value}</p>
                      </div>
                      <Badge variant={tx.type === 'buy' ? 'default' : 'destructive'} className="text-xs">
                        {tx.type.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Wallets */}
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Whale Wallets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topWalletData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      type="number" 
                      fontSize={10}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      dataKey="wallet" 
                      type="category" 
                      fontSize={10}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      width={60}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="balance" 
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Project Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-background to-muted/20 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                Complete Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Working Use Cases */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-primary">🎯 Working Use Cases</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                    <h5 className="font-medium mb-2">Whale Movement Tracking</h5>
                    <p className="text-sm text-muted-foreground">Monitor Bitcoin & Ethereum whale wallets, detect large transfers, and analyze market impact patterns in real-time.</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                    <h5 className="font-medium mb-2">News Sentiment Analysis</h5>
                    <p className="text-sm text-muted-foreground">AI-powered analysis of crypto news with role-specific insights for traders, investors, and analysts.</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                    <h5 className="font-medium mb-2">Real-time Chat Interface</h5>
                    <p className="text-sm text-muted-foreground">Interactive AI chat supporting queries like "Show me recent whale movements" or "What's the market sentiment?"</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                    <h5 className="font-medium mb-2">Multi-Agent Orchestration</h5>
                    <p className="text-sm text-muted-foreground">Intelligent routing between whale analyzer and news analyst based on query context and user role.</p>
                  </div>
                </div>
              </div>

              {/* Technical Architecture */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-primary">🏗️ Technical Architecture</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                    <h5 className="font-medium mb-2">Frontend</h5>
                    <p className="text-sm text-muted-foreground">React + TypeScript + Tailwind CSS + Framer Motion + Recharts</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                    <h5 className="font-medium mb-2">Backend</h5>
                    <p className="text-sm text-muted-foreground">Supabase Edge Functions + PostgreSQL + Authentication + Storage</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                    <h5 className="font-medium mb-2">AI Integration</h5>
                    <p className="text-sm text-muted-foreground">Custom AI agents with role-based analysis and intelligent query routing</p>
                  </div>
                </div>
              </div>

              {/* Production Features */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-primary">✨ Production Features</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Live Whale Tracking",
                    "AI News Analysis", 
                    "Role-based Insights",
                    "Real-time Chat",
                    "Mobile Responsive",
                    "Dark/Light Mode",
                    "Error Handling",
                    "Fallback Systems",
                    "Data Visualization",
                    "Interactive Charts",
                    "Market Sentiment",
                    "Transaction Analysis"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded text-sm hover:bg-muted transition-colors">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Demo Examples */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-primary">💬 Try These Example Queries in Chat</h4>
                <div className="space-y-2">
                  {[
                    '"Show me recent Bitcoin whale movements"',
                    '"What\'s the current market sentiment on Ethereum?"',
                    '"Analyze today\'s crypto news for trading insights"',
                    '"Track wallets with over $10M transactions"',
                    '"What are the top market trends this week?"',
                    '"Show me bearish news sentiment analysis"'
                  ].map((query, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg border-l-4 border-primary text-sm font-mono hover:bg-muted/50 transition-colors cursor-pointer">
                      {query}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center pt-4 border-t border-border space-y-4">
                <p className="text-muted-foreground">
                  Explore the complete Aikiko platform with live data and AI-powered insights
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button 
                    onClick={() => window.location.href = '/aikiko'}
                    className="glow-primary"
                  >
                    Open Chat Interface
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                  >
                    View Landing Page
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    Live Data
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Real-time Analysis
                  </span>
                  <span className="flex items-center gap-1">
                    <Wallet className="h-4 w-4" />
                    Whale Tracking
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}