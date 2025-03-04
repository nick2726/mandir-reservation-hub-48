
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Heart, Calendar } from 'lucide-react';
import ServiceCard from './ServiceCard';

const TempleServicesSection: React.FC = () => {
  return (
    <section className="py-16 my-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4">Services</Badge>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Temple Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need for a blessed and comfortable visit to Baba Baidyanath Dham</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Clock className="h-12 w-12 text-amber-500 group-hover:text-primary transition-colors duration-300" />}
            title="Aarti & Puja Timings"
            description="View the schedule of daily rituals and special ceremonies performed at the temple."
            link="#schedule"
            delay={0}
          />
          <ServiceCard 
            icon={<Heart className="h-12 w-12 text-amber-500 group-hover:text-primary transition-colors duration-300" />}
            title="Online Donations"
            description="Contribute to the temple's activities and maintenance through secure online donations."
            link="#donate"
            delay={0.1}
          />
          <ServiceCard 
            icon={<Calendar className="h-12 w-12 text-amber-500 group-hover:text-primary transition-colors duration-300" />}
            title="Events & Festivals"
            description="Stay updated with upcoming festivals, events, and special occasions at the temple."
            link="#events"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
};

export default TempleServicesSection;
