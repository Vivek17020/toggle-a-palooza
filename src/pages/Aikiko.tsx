import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Wallet, 
  TrendingUp, 
  Bot, 
  MessageCircle,
  BarChart3,
  Globe,
  Zap,
  Shield,
  ArrowLeft,
  ArrowRight,
  Activity,
  Target,
  Newspaper
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AikikoHomepage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    {
      icon: Wallet,
      title: "Whale Tracker",
      description: "Monitor large cryptocurrency transactions and whale wallet movements in real-time with advanced analytics.",
      color: "from-blue-500 to-cyan-500",
      link: "/aikiko/whale-tracker"
    },
    {
      icon: TrendingUp,
      title: "Market Sentiment",
      description: "AI-powered sentiment analysis of crypto news and social media to predict market trends.",
      color: "from-green-500 to-emerald-500",
      link: "/aikiko/sentiment-analysis"
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Chat with our intelligent AI to get personalized crypto insights and trading recommendations.",
      color: "from-purple-500 to-pink-500",
      link: "/aikiko/chat"
    },
    {
      icon: BarChart3,
      title: "Technical Analysis",
      description: "Advanced charting tools with AI-enhanced pattern recognition and market indicators.",
      color: "from-orange-500 to-red-500",
      link: "/aikiko/technical-analysis"
    }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Start Chat",
      description: "Begin conversation with Aikiko AI",
      link: "/aikiko/chat"
    },
    {
      icon: Activity,
      title: "Live Dashboard",
      description: "View real-time market data",
      link: "/dashboard"
    },
    {
      icon: Target,
      title: "Portfolio Analysis",
      description: "Analyze your crypto portfolio",
      link: "/aikiko/portfolio"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold gradient-text">Aikiko</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              🤖 Aikiko AI
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground/90">
              Your Intelligent Crypto Companion
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Harness the power of AI to analyze cryptocurrency markets, track whale movements, and make informed trading decisions with advanced sentiment analysis.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link to="/aikiko/chat">
              <Button size="lg" className="text-lg px-8 py-4 glow-primary group">
                Start Chatting
                <MessageCircle className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                View Dashboard
                <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">AI-Powered Features</h3>
            <p className="text-muted-foreground text-lg">
              Advanced tools designed to give you an edge in cryptocurrency markets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={feature.link}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-card to-card/50 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-primary text-sm group-hover:translate-x-1 transition-transform">
                        Explore Feature
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 px-6 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Quick Actions</h3>
            <p className="text-muted-foreground text-lg">
              Get started with these popular features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={action.link}>
                  <Card className="text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <action.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Real-Time Intelligence</h3>
            <p className="text-muted-foreground text-lg">
              Stay ahead with live market data and AI insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">127</div>
              <div className="text-muted-foreground">Active Whales</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2.4B</div>
              <div className="text-muted-foreground">24h Volume</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">AI Monitoring</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-6 bg-gradient-to-r from-primary/5 to-accent/5"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h3 className="text-4xl font-bold mb-6">Ready to Start?</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of traders using AI-powered insights to make better decisions
            </p>
            <Link to="/aikiko/chat">
              <Button size="lg" className="text-lg px-12 py-6 glow-primary group">
                Start Your AI Journey
                <Zap className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AikikoHomepage;