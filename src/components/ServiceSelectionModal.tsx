import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, ArrowRight } from "lucide-react";

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceSelectionModal = ({ isOpen, onClose }: ServiceSelectionModalProps) => {
  const services = [
    {
      title: "Try Aikiko",
      description: "AI-powered crypto intelligence with advanced market analysis and sentiment tracking",
      icon: Brain,
      link: "/aikiko",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Try Rug Guardian", 
      description: "Community-driven fraud protection and risk assessment for crypto investments",
      icon: Shield,
      link: "https://fil-e-rug-sigma.vercel.app/",
      external: true,
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Choose Your Service</DialogTitle>
          <DialogDescription>
            Select which WhaleEye service you'd like to explore
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {service.external ? (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                    >
                      <Button className="w-full glow-primary group">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={service.link} onClick={onClose}>
                      <Button className="w-full glow-primary group">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceSelectionModal;