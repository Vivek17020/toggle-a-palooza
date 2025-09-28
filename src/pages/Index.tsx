import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  TrendingUp, 
  Bot, 
  Activity, 
  Newspaper, 
  Brain,
  Github,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import Navbar from "@/components/Navbar";
import ServiceSelectionModal from "@/components/ServiceSelectionModal";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
      title: "Whale Wallet Analyzer",
      description: "Track and analyze large cryptocurrency transactions in real-time. Identify patterns and insights from whale wallet movements.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Newspaper,
      title: "Market News Analyst",
      description: "AI-powered sentiment analysis of cryptocurrency news. Get real-time market insights and trend predictions.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Bot,
      title: "AI Orchestrator",
      description: "Intelligent query routing that combines wallet analysis with news sentiment for comprehensive market intelligence.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-24 pb-16 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              🐋 WhaleEye
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground/90">
              Smart Crypto Intelligence Platform
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              WhaleEye combines real-time whale wallet tracking, market sentiment analysis, and community-driven fraud alerts to help you make smarter, safer crypto decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 glow-primary group"
              onClick={() => setIsModalOpen(true)}
            >
              Try WhaleEye
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
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
            <h3 className="text-3xl font-bold mb-4">Powerful Features</h3>
            <p className="text-muted-foreground text-lg">
              Everything you need for comprehensive cryptocurrency market analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-card to-card/50">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* All Features Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">All Features</h3>
            <p className="text-muted-foreground text-lg">
              Complete toolkit for crypto market intelligence and security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">Real-Time Whale Tracking</h4>
              <p className="text-sm text-muted-foreground">Monitor large cryptocurrency transactions as they happen</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">Market Sentiment Analysis</h4>
              <p className="text-sm text-muted-foreground">AI-powered analysis of market emotions and trends</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">Community Fraud Alerts</h4>
              <p className="text-sm text-muted-foreground">Crowdsourced warnings about suspicious activities</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">News Impact Analysis</h4>
              <p className="text-sm text-muted-foreground">Track how news affects cryptocurrency prices</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">Portfolio Protection</h4>
              <p className="text-sm text-muted-foreground">Safeguard your investments with smart alerts</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">Evaluate potential risks before making trades</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">Smart Notifications</h4>
              <p className="text-sm text-muted-foreground">Get alerted about important market movements</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">Transaction Insights</h4>
              <p className="text-sm text-muted-foreground">Deep analysis of blockchain transaction patterns</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-6 rounded-lg border border-border bg-card/50">
              <h4 className="font-semibold mb-2 text-primary">AI-Powered Predictions</h4>
              <p className="text-sm text-muted-foreground">Machine learning models for market forecasting</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 px-6 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Real-Time Intelligence</h3>
            <p className="text-muted-foreground text-lg">
              Track the crypto market with precision and insight
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">120+</div>
              <div className="text-muted-foreground">Whale Wallets Tracked</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$24.9M</div>
              <div className="text-muted-foreground">24h Transaction Volume</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">70%</div>
              <div className="text-muted-foreground">Market Sentiment (Bullish)</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold gradient-text">WhaleEye</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/your-repo/aikiko" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <div className="text-sm text-muted-foreground">
                MIT License
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2025 WhaleEye All Rights Reserved</p>
          </div>
        </div>
      </footer>
      
      <ServiceSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
