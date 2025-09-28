import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Brain, 
  Github, 
  ExternalLink, 
  ArrowLeft,
  Wallet,
  Newspaper,
  Bot,
  Zap,
  Shield,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import Navbar from "@/components/Navbar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProjectDetails = () => {
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
      description: "Advanced tracking and analysis of large cryptocurrency transactions in real-time. Identify patterns, market movements, and whale behavior across multiple blockchains.",
      technologies: ["Blockchain APIs", "Real-time Processing", "Pattern Recognition"],
      status: "Production Ready"
    },
    {
      icon: Newspaper,
      title: "Market News Analyst",
      description: "AI-powered sentiment analysis of cryptocurrency news with role-specific insights for different user types including traders, investors, and market analysts.",
      technologies: ["Natural Language Processing", "Sentiment Analysis", "Machine Learning"],
      status: "Production Ready"
    },
    {
      icon: Bot,
      title: "AI Orchestrator",
      description: "Intelligent query routing system that combines whale analysis with news sentiment for comprehensive market intelligence and automated decision making.",
      technologies: ["Query Processing", "Multi-Agent Systems", "Context Understanding"],
      status: "Production Ready"
    },
    {
      icon: MessageSquare,
      title: "Interactive Chat Interface",
      description: "Natural language interface supporting complex queries like 'Show me recent whale movements' or 'What's the current market sentiment for Bitcoin?'",
      technologies: ["Natural Language Understanding", "Context Management", "Real-time Updates"],
      status: "Live Demo Available"
    }
  ];

  const techStack = [
    { category: "Frontend", technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts"] },
    { category: "Backend", technologies: ["Supabase", "Edge Functions", "PostgreSQL", "Authentication"] },
    { category: "AI/ML", technologies: ["OpenAI API", "Custom Agents", "Sentiment Analysis", "Pattern Recognition"] },
    { category: "Data", technologies: ["Blockchain APIs", "News APIs", "Real-time Streaming", "Analytics"] }
  ];

  const useCases = [
    {
      title: "Whale Movement Detection",
      description: "Monitor large cryptocurrency transfers and analyze market impact",
      example: "Track when a whale moves 1000+ BTC and predict market reactions"
    },
    {
      title: "Market Sentiment Analysis",
      description: "Real-time analysis of news sentiment and social media trends",
      example: "Analyze breaking news about regulatory changes and their market impact"
    },
    {
      title: "Trading Signal Generation",
      description: "Combine whale movements with sentiment for trading insights",
      example: "Alert when negative news coincides with whale selling activity"
    },
    {
      title: "Risk Assessment",
      description: "Evaluate market conditions using multiple data sources",
      example: "Assess portfolio risk based on whale movements and market sentiment"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Project Overview */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-24 pb-8 px-6 bg-gradient-to-b from-primary/10 to-background"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-10 w-10 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold gradient-text">Aikiko Project Overview</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                AI-powered cryptocurrency intelligence platform combining whale tracking, sentiment analysis, and real-time market insights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border hover:shadow-lg transition-all">
                <div className="text-2xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">AI Agents</div>
                <div className="text-xs text-muted-foreground mt-1">Working in harmony</div>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border hover:shadow-lg transition-all">
                <div className="text-2xl font-bold text-primary mb-2">120+</div>
                <div className="text-sm text-muted-foreground">Whale Wallets</div>
                <div className="text-xs text-muted-foreground mt-1">Real-time monitoring</div>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border hover:shadow-lg transition-all">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Market Analysis</div>
                <div className="text-xs text-muted-foreground mt-1">Continuous intelligence</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Header */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-12 pb-12 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-12 w-12 text-primary" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  Aikiko Project Details
                </h1>
                <p className="text-xl text-muted-foreground mt-2">
                  Comprehensive Cryptocurrency Intelligence Platform
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="default" className="text-sm">Production Ready</Badge>
              <Badge variant="secondary" className="text-sm">AI-Powered</Badge>
              <Badge variant="outline" className="text-sm">Real-time Analytics</Badge>
              <Badge variant="outline" className="text-sm">Open Source</Badge>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
              Aikiko is an advanced AI-powered cryptocurrency analysis platform that combines whale wallet tracking, 
              market sentiment analysis, and intelligent orchestration to provide comprehensive market intelligence. 
              Built with modern web technologies and powered by cutting-edge AI agents.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Features */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-12 px-6 bg-muted/30"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Features & Capabilities</h2>
            <p className="text-muted-foreground text-lg">
              Four powerful AI agents working together for comprehensive market analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 p-3 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs">{feature.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Use Cases */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-12 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real-World Use Cases</h2>
            <p className="text-muted-foreground text-lg">
              Practical applications for traders, investors, and market analysts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-4">{useCase.description}</p>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-1">Example:</p>
                      <p className="text-sm text-muted-foreground italic">{useCase.example}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technical Architecture */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-12 px-6 bg-muted/30"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technical Architecture</h2>
            <p className="text-muted-foreground text-lg">
              Built with modern technologies for scalability and performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{stack.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {stack.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="block">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Performance Stats */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-12 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Performance & Capabilities</h2>
            <p className="text-muted-foreground text-lg">
              Real-time metrics and system capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">120+</div>
              <div className="text-muted-foreground">Whale Wallets Tracked</div>
              <div className="text-sm text-muted-foreground mt-1">Across Bitcoin & Ethereum</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$24.9M</div>
              <div className="text-muted-foreground">24h Transaction Volume</div>
              <div className="text-sm text-muted-foreground mt-1">Real-time monitoring</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">System Uptime</div>
              <div className="text-sm text-muted-foreground mt-1">High availability</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 px-6 bg-gradient-to-r from-primary/10 to-primary/5"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Aikiko?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Try our live demo to see the power of AI-driven cryptocurrency analysis in action.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/aikiko">
              <Button size="lg" className="text-lg px-8 py-4 glow-primary">
                <MessageSquare className="mr-2 h-5 w-5" />
                Try Live Demo
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>
            </Link>
            <a 
              href="https://github.com/your-repo/aikiko" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                <Github className="mr-2 h-5 w-5" />
                GitHub Repository
              </Button>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold gradient-text">Aikiko</span>
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
            <p>© 2024 Aikiko. Built with React, Vite, and Supabase.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetails;