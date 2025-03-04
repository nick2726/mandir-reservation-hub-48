
import React from 'react';
import { useToast } from '@/hooks/use-toast';

// Import sections from the new directory structure
import HeroSection from './sections/HeroSection';
import QuickInfoSection from './sections/QuickInfoSection';
import AboutSection from './sections/AboutSection';
import LiveDarshanSection from './sections/LiveDarshanSection';
import TempleServicesSection from './sections/TempleServicesSection';
import BookingProcessSection from './sections/BookingProcessSection';
import CTASection from './sections/CTASection';

const Index = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Show welcome toast when page loads
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to Baba Baidyanath Dham",
          description: "Explore our temple services and book your temple pass for a divine experience.",
          duration: 5000,
        });
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 1500);
    }
  }, []);

  return (
    <div className="pt-20">
      <HeroSection />
      <QuickInfoSection />
      <AboutSection />
      <LiveDarshanSection />
      <TempleServicesSection />
      <BookingProcessSection />
      <CTASection />
    </div>
  );
};

export default Index;
