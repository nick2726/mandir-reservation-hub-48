
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, FileText, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

const BookingProcessSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-3xl my-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4">Booking Process</Badge>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">How to Book Your Pass</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Simple steps to secure your visit to Baba Baidyanath Dham</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Calendar className="h-10 w-10 text-amber-500" />}
            title="Choose Your Date"
            description="Browse available dates and select the one that works best for your pilgrimage."
            delay={0}
            stepNumber={1}
          />
          <FeatureCard 
            icon={<CreditCard className="h-10 w-10 text-amber-500" />}
            title="Secure Payment"
            description="Pay securely online with multiple payment options available."
            delay={0.1}
            stepNumber={2}
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-amber-500" />}
            title="Instant Pass"
            description="Receive your digital pass instantly via email and in the app."
            delay={0.2}
            stepNumber={3}
          />
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-amber-500" />}
            title="Safe Visit"
            description="Entry management ensures a safe and organized visiting experience."
            delay={0.3}
            stepNumber={4}
          />
        </div>
      </div>
    </section>
  );
};

export default BookingProcessSection;
