
import React from 'react';
import { useToast } from '@/hooks/use-toast';

// Import sections from the new directory structure
import HeroSection from './sections/HeroSection';
import QuickInfoSection from './sections/QuickInfoSection';
import BabaInfoSection from './sections/BabaInfoSection';
import AboutSection from './sections/AboutSection';
import CTASection from './sections/CTASection';

const DivineDarshan = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Show welcome toast when page loads
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to Baba Baidyanath Dham",
          description: "Explore the divine journey at the sacred Jyotirlinga temple.",
          duration: 5000,
        });
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 1500);
    }
  }, [toast]);

  return (
    <div className="pt-20">
      <HeroSection />
      <QuickInfoSection />
      <AboutSection />
      <BabaInfoSection />
      <CTASection />
    </div>
  );
};

export default DivineDarshan;
