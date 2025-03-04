
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 my-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <Badge className="mb-4">About The Temple</Badge>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              About Baba Baidyanath Dham
            </h2>
            <p className="text-muted-foreground mb-4">
              Baba Baidyanath Dham, located in Deoghar, Jharkhand, is one of the 12 Jyotirlingas in India. 
              The temple is dedicated to Lord Shiva and is known for its spiritual significance and ancient history.
            </p>
            <p className="text-muted-foreground mb-6">
              According to legend, Ravana performed severe penance to please Lord Shiva and was rewarded with the sacred Shivalinga. 
              The temple complex includes 22 temples and is visited by millions of devotees, especially during the auspicious month of Shravan.
            </p>
            <Button asChild variant="outline" className="group relative overflow-hidden">
              <a href="#about" className="flex items-center gap-2">
                <Info className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>Learn More</span>
                <span className="absolute inset-0 w-full h-full bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
              </a>
            </Button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg group"
          >
            <img 
              src="https://images.unsplash.com/photo-1572767162983-1c2ec8721a14" 
              alt="Baba Baidyanath Temple" 
              className="w-full h-auto object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
