
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Video, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary/90 z-0" />
      
      {/* Sacred pattern overlay */}
      <div className="absolute inset-0 om-pattern opacity-30 z-[1]" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Badge className="bg-primary/20 text-primary-foreground border-primary/30 px-4 py-2 text-sm font-body backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              One of the 12 Sacred Jyotirlingas
            </Badge>
          </motion.div>

          {/* Sanskrit mantra */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-devanagari text-2xl md:text-3xl text-primary mb-4"
          >
            ॐ नमः शिवाय
          </motion.p>

          {/* Main heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-secondary-foreground mb-6 leading-tight"
          >
            श्री बैद्यनाथ धाम
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 text-primary">
              Baba Baidyanath Temple
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-secondary-foreground/90 font-body mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the divine blessings at one of India's most sacred temples. 
            Book your darshan pass and embark on a spiritual journey to the abode of Lord Shiva.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-lg px-8 py-6 rounded-lg shadow-sacred animate-sacred-glow"
            >
              <Link to="/passes" className="flex items-center gap-2">
                <span>Book Darshan Pass</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-primary/50 text-secondary-foreground hover:bg-primary/10 font-body text-lg px-8 py-6 rounded-lg backdrop-blur-sm"
            >
              <Link to="/live-darshan" className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                <span>Live Darshan</span>
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary">50L+</p>
              <p className="text-sm text-secondary-foreground/70 font-body">Annual Visitors</p>
            </div>
            <div className="text-center border-x border-primary/20">
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary">4.9★</p>
              <p className="text-sm text-secondary-foreground/70 font-body">Devotee Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary">24/7</p>
              <p className="text-sm text-secondary-foreground/70 font-body">Support</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
