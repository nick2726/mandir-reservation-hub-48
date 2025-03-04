
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CTASection: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <section className="py-16 my-16">
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-primary/5 to-amber-500/10 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-amber-200/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -mr-32 -mt-32 z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32 z-0"></div>
          <div className="relative z-10 max-w-3xl">
            <Badge className="mb-4">Begin Your Pilgrimage</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Secure Your Divine Encounter</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book your Baba Baidyanath Dham pass today for a seamless, spiritual experience at this sacred Jyotirlinga temple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-8 group relative overflow-hidden"
                onClick={() => {
                  toast({
                    title: "Begin Your Spiritual Journey",
                    description: "Taking you to our booking page...",
                    duration: 3000,
                  });
                }}
              >
                <Link to="/passes" className="flex items-center gap-2">
                  <span>Book Temple Pass</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline"
                size="lg" 
                className="rounded-full px-8 group relative overflow-hidden"
              >
                <Link to="/live-darshan" className="flex items-center gap-2">
                  <span>Watch Live Darshan</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 w-full h-full bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
