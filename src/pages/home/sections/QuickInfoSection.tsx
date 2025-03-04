
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users } from 'lucide-react';
import { QuickInfoCard } from '../ui-components/QuickInfoCard';

const QuickInfoSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickInfoCard 
            icon={<Clock className="h-10 w-10 text-amber-500" />}
            title="Temple Timings"
            description="4:00 AM - 11:00 PM daily"
            delay={0}
          />
          <QuickInfoCard 
            icon={<MapPin className="h-10 w-10 text-amber-500" />}
            title="Location"
            description="Deoghar, Jharkhand, India"
            delay={0.1}
          />
          <QuickInfoCard 
            icon={<Users className="h-10 w-10 text-amber-500" />}
            title="Daily Visitors"
            description="10,000+ devotees"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
};

export default QuickInfoSection;
