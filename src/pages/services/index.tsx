
import React from 'react';
import { Badge } from '@/components/ui/badge';
import TempleServicesSection from '../home/sections/TempleServicesSection';
import BookingProcessSection from '../home/sections/BookingProcessSection';
import AboutSection from '../home/sections/AboutSection';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4">Temple Services</Badge>
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
            Complete Temple Services & Information
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive services and information about Baba Baidyanath Dham
          </p>
        </div>
      </div>
      
      <AboutSection />
      <TempleServicesSection />
      <BookingProcessSection />
    </div>
  );
};

export default ServicesPage;
