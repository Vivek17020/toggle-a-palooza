import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { whaleAnalyzer, newsAnalyst, orchestrator, type WhaleTransaction, type NewsItem, type MarketData } from "@/services/mockApi";
import { TrendingUp, TrendingDown, Activity, Newspaper, Target, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const [whaleData, setWhaleData] = useState<WhaleTransaction[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [insights, setInsights] = useState<{ insights: string[]; recommendations: string[] }>({ insights: [], recommendations: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [whales, news, market, aiInsights] = await Promise.all([
        whaleAnalyzer.getRecentTransactions(),
        newsAnalyst.getLatestNews(),
        orchestrator.getMarketOverview(),
        orchestrator.generateInsights()
      ]);
      
      setWhaleData(whales);
      setNewsData(news);
      setMarketData(market);
      setInsights(aiInsights);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 gradient-text"
          >
            Intelligence Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Real-time crypto market intelligence powered by AI
          </motion.p>
          <Button 
            onClick={loadDashboardData} 
            disabled={loading}
            className="mt-4 gap-2"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Market Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {marketData.map((coin, index) => (
            <Card key={coin.symbol} className="bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary/20 transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span>{coin.symbol}</span>
                  <Badge variant={coin.change_24h >= 0 ? "default" : "destructive"} className="gap-1">
                    {coin.change_24h >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {coin.change_24h.toFixed(2)}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{formatCurrency(coin.price)}</div>
                <div className="text-sm text-muted-foreground">
                  Vol: {formatCurrency(coin.volume_24h)}
                </div>
                <div className="text-sm text-muted-foreground">
                  MCap: {formatCurrency(coin.market_cap)}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <Tabs defaultValue="whales" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="whales" className="gap-2">
              <Activity className="h-4 w-4" />
              Whale Activity
            </TabsTrigger>
            <TabsTrigger value="news" className="gap-2">
              <Newspaper className="h-4 w-4" />
              News Analysis
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <Target className="h-4 w-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whales" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Recent Whale Transactions</CardTitle>
                  <CardDescription>Large cryptocurrency movements tracked in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {whaleData.map((transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30"
                      >
                        <div className="flex items-center gap-4">
                          <Badge variant={transaction.type === 'buy' ? "default" : "destructive"}>
                            {transaction.type.toUpperCase()}
                          </Badge>
                          <div>
                            <div className="font-semibold">
                              {transaction.amount.toLocaleString()} {transaction.token}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.address.slice(0, 8)}...{transaction.address.slice(-6)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(transaction.value_usd)}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatTime(transaction.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Market Sentiment Analysis</CardTitle>
                  <CardDescription>AI-powered analysis of cryptocurrency news and social sentiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newsData.map((news, index) => (
                      <motion.div
                        key={news.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-4 bg-background/50 rounded-lg border border-border/30"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm flex-1">{news.title}</h4>
                          <Badge 
                            variant={
                              news.sentiment === 'positive' ? 'default' : 
                              news.sentiment === 'negative' ? 'destructive' : 
                              'secondary'
                            }
                            className="ml-2"
                          >
                            {news.sentiment}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{news.source}</span>
                          <span>Impact: {news.impact_score}/10</span>
                          <span>{formatTime(news.timestamp)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 md:grid-cols-2"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-accent">Market Insights</CardTitle>
                  <CardDescription>AI-generated market analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {insights.insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-3 bg-background/50 rounded-lg border-l-4 border-l-accent"
                      >
                        <p className="text-sm">{insight}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-success">Recommendations</CardTitle>
                  <CardDescription>Actionable trading suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {insights.recommendations.map((recommendation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-3 bg-background/50 rounded-lg border-l-4 border-l-success"
                      >
                        <p className="text-sm">{recommendation}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Dashboard;