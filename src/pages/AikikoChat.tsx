import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Wallet, 
  TrendingUp, 
  Bot, 
  Send, 
  BarChart3, 
  Globe,
  ChevronDown,
  History,
  User,
  LogIn,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { callNewsAgent, formatNewsResponse, type OrchestratorResponse } from '@/services/newsAgent';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  queryType?: 'whale' | 'news' | 'combined' | 'general';
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  role: string;
}

type UserRole = 'trader' | 'investor' | 'analyst';

const roleColors = {
  trader: 'hsl(142, 76%, 36%)', // green
  investor: 'hsl(221, 83%, 53%)', // blue  
  analyst: 'hsl(271, 91%, 65%)', // purple
};

const suggestionChips = [
  { text: "Analyze wallet 0xd8da6bf26964af9d7eed9e03e53415d37aa96045", icon: Wallet },
  { text: "Show latest crypto news sentiment", icon: TrendingUp },
  { text: "Combine wallet analysis with market news", icon: BarChart3 },
  { text: "What's the overall market sentiment?", icon: Globe },
];

const mockChatHistory: ChatSession[] = [
  { id: '1', title: 'Whale Analysis Session', timestamp: new Date(Date.now() - 3600000), role: 'analyst' },
  { id: '2', title: 'Market Sentiment Review', timestamp: new Date(Date.now() - 7200000), role: 'trader' },
  { id: '3', title: 'DeFi News Analysis', timestamp: new Date(Date.now() - 86400000), role: 'investor' },
];

export default function Aikiko() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('trader');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [chatSessions] = useState<ChatSession[]>(mockChatHistory);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('aikiko-user-role') as UserRole;
    if (savedRole && ['trader', 'investor', 'analyst'].includes(savedRole)) {
      setUserRole(savedRole);
    }
  }, []);

  // Save role to localStorage when changed
  useEffect(() => {
    localStorage.setItem('aikiko-user-role', userRole);
  }, [userRole]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://ptcffpiqkrpblonmkmba.supabase.co/functions/v1/orchestrator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          userRole: userRole,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data: OrchestratorResponse = await response.json();
      
      // Enhanced formatting for news responses
      let formattedContent = data.response;
      if (data.queryType === 'news' && data.data?.newsData) {
        formattedContent = formatNewsResponse(data);
      }
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: formattedContent,
        sender: 'ai',
        timestamp: new Date(),
        queryType: data.queryType,
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
  };

  const getRoleStyle = (role: UserRole) => ({
    '--role-color': roleColors[role],
  } as React.CSSProperties);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Back Navigation */}
      <div className="p-4 border-b border-border bg-card">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: roleColors[userRole] }}
                />
                <h2 className="text-xl font-bold">Aikiko AI</h2>
              </div>
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {user.email?.split('@')[0]}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="h-8 w-8 p-0"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>
          
          <Select value={userRole} onValueChange={(value: UserRole) => setUserRole(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trader">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Trader
                </div>
              </SelectItem>
              <SelectItem value="investor">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Investor
                </div>
              </SelectItem>
              <SelectItem value="analyst">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Analyst
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Chat History</span>
          </div>
          
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {chatSessions.map((session) => (
                <motion.div
                  key={session.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="ml-2 text-xs"
                      style={{ backgroundColor: `${roleColors[session.role as UserRole]}20` }}
                    >
                      {session.role}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                      style={message.sender === 'user' ? getRoleStyle(userRole) : {}}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'ai' && (
                          <Bot className="w-5 h-5 mt-0.5 text-primary" />
                        )}
                        {message.sender === 'user' && (
                          <User className="w-5 h-5 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.content}
                          </div>
                          {message.queryType && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              {message.queryType}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-lg p-4 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggestion Chips */}
          {messages.length === 0 && user && (
            <div className="p-6 border-t border-border">
              <div className="max-w-4xl mx-auto">
                <p className="text-sm text-muted-foreground mb-3">Try these suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestionChips.map((chip, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestionClick(chip.text)}
                      className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                    >
                      <chip.icon className="w-4 h-4" />
                      {chip.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Authentication Required Message */}
          {!user && (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign In Required</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Access to Aikiko's AI-powered cryptocurrency analysis requires authentication. 
                  Sign in to start chatting with our intelligent assistant.
                </p>
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="glow-primary"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In to Chat
                </Button>
              </div>
            </div>
          )}

          {/* Input Area */}
          {user && (
            <div className="p-6 border-t border-border">
              <div className="max-w-4xl mx-auto flex gap-3">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder={`Ask Aikiko as a ${userRole}...`}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  style={getRoleStyle(userRole)}
                  className="px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Right Panel */}
      <div className="w-80 border-l border-border bg-card p-6 space-y-6">
        {/* Whale Tracker */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wallet className="w-4 h-4" />
              Whale Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active Whales</span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">24h Volume</span>
                <span className="font-medium text-green-600">+$2.4B</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Net Flow</span>
                <span className="font-medium text-blue-600">+$340M</span>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">Latest Activity</p>
              <p className="text-xs mt-1">Large ETH accumulation detected</p>
            </div>
          </CardContent>
        </Card>

        {/* News Feed */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              News Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    BULLISH
                  </Badge>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <p className="text-xs">Ethereum ETF approval signals strong institutional adoption</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">
                    BEARISH
                  </Badge>
                  <span className="text-xs text-muted-foreground">4h ago</span>
                </div>
                <p className="text-xs">SEC investigation into major exchange raises concerns</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-800">
                    NEUTRAL
                  </Badge>
                  <span className="text-xs text-muted-foreground">6h ago</span>
                </div>
                <p className="text-xs">Bitcoin mining difficulty reaches new all-time high</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4" />
              Market Pulse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Overall Sentiment</span>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  Bullish
                </Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Fear & Greed</span>
                <span className="font-medium">73 (Greed)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium">$2.1T</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => {
          setIsAuthModalOpen(false);
          toast({
            title: "Welcome!",
            description: "You've successfully signed in to Aikiko.",
          });
        }}
      />
    </div>
  );
}