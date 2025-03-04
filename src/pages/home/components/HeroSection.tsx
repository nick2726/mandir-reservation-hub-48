
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const HeroSection: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544006659-f0b21884ce1d')] bg-cover bg-center opacity-25 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/10 z-0"></div>
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <Badge variant="outline" className="bg-white/80 text-primary px-3 py-1 mb-4 backdrop-blur-sm">
            Sacred Journey Awaits
          </Badge>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent sm:text-5xl"
        >
          Baba Baidyanath Dham
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-foreground mb-8 max-w-2xl mx-auto"
        >
          Experience the divine presence at one of India's most sacred Jyotirlingas. Book your temple pass today for a blessed darshan.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button 
            asChild 
            size="lg" 
            className="rounded-full px-8 group relative overflow-hidden"
            onClick={() => {
              toast({
                title: "Pass Booking",
                description: "Redirecting you to our secure pass booking page.",
                duration: 3000,
              });
            }}
          >
            <Link to="/passes" className="flex items-center gap-2">
              <span>Book Temple Pass</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
            </Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8 overflow-hidden group relative"
            onClick={() => {
              toast({
                title: "Live Darshan",
                description: "Connecting you to live darshan stream...",
                duration: 3000,
              });
            }}
          >
            <a href="#live-darshan" className="flex items-center gap-2">
              <Video className="h-4 w-4 group-hover:text-primary transition-colors" />
              <span>Live Darshan</span>
              <span className="absolute inset-0 w-full h-full bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
