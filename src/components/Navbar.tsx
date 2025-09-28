import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain, Activity, Newspaper, Target, MessageCircle } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">WhaleEye</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/project-details"
              className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Project
            </Link>
            <a
              href="https://fil-e-rug-sigma.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Rug Guardian
            </a>
            <button
              onClick={() => scrollToSection('news-analysis')}
              className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
            >
              <Newspaper className="h-4 w-4" />
              News Analysis
            </button>
            <Link
              to="/aikiko"
              className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </Link>
            <Link to="/dashboard">
              <Button variant="default" className="glow-primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 py-4"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/dashboard"
                className="text-left text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 p-2"
                onClick={() => setIsOpen(false)}
              >
                <Activity className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/project-details"
                className="text-left text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 p-2"
                onClick={() => setIsOpen(false)}
              >
                <Target className="h-4 w-4" />
                Project
              </Link>
              <a
                href="https://fil-e-rug-sigma.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 p-2"
                onClick={() => setIsOpen(false)}
              >
                <Target className="h-4 w-4" />
                Rug Guardian
              </a>
              <button
                onClick={() => scrollToSection('news-analysis')}
                className="text-left text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 p-2"
              >
                <Newspaper className="h-4 w-4" />
                News Analysis
              </button>
              <Link
                to="/aikiko"
                className="text-left text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 p-2"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                Chat
              </Link>
              <Link to="/dashboard">
                <Button variant="default" className="glow-primary self-start">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;