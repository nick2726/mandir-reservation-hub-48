
import React from 'react';
import HeroSection from './components/HeroSection';
import QuickInfoSection from './components/QuickInfoSection';
import AboutSection from './components/AboutSection';
import LiveDarshanSection from './components/LiveDarshanSection';
import TempleServicesSection from './components/TempleServicesSection';
import BookingProcessSection from './components/BookingProcessSection';
import CTASection from './components/CTASection';
import { useToast } from '@/hooks/use-toast';

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
