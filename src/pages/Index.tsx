
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, FileText, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent sm:text-5xl"
          >
            Book Your Babadham Mandir Pass
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Secure your visit with our easy-to-use online booking system. Hassle-free spiritual journey starts here.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/passes">Browse Available Passes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link to="/auth">Sign In</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30 rounded-3xl my-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Choose Your Date"
              description="Browse available dates and select the one that works best for your pilgrimage."
              delay={0}
            />
            <FeatureCard 
              icon={<CreditCard className="h-10 w-10 text-primary" />}
              title="Secure Payment"
              description="Pay securely online with multiple payment options available."
              delay={0.1}
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Instant Pass"
              description="Receive your digital pass instantly via email and in the app."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Safe Visit"
              description="Entry management ensures a safe and organized visiting experience."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 my-16">
        <div className="container mx-auto">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to plan your spiritual journey?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Book your Babadham Mandir pass today and ensure a smooth, hassle-free visit to this sacred place.
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/passes">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default Index;
