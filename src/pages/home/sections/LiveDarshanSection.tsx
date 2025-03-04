
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LiveDarshanSection: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <section id="live-darshan" className="py-16 my-8 bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-3xl">
      <div className="container mx-auto text-center">
        <Badge className="mb-4">Virtual Experience</Badge>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Live Darshan</h2>
        <div className="max-w-4xl mx-auto bg-card rounded-xl overflow-hidden shadow-md border border-amber-200/20">
          <div className="aspect-w-16 aspect-h-9 relative bg-muted">
            <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
              <div className="text-center">
                <Video className="h-20 w-20 text-amber-500/50 mx-auto mb-4" />
                <p className="text-white">Live stream will appear here during temple hours</p>
                <p className="text-sm text-gray-400 mt-2">9:00 AM - 7:00 PM IST</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                  onClick={() => {
                    toast({
                      title: "Live Darshan Alert",
                      description: "We'll notify you when the live stream begins.",
                      duration: 3000,
                    });
                  }}
                >
                  Notify Me When Live
                </Button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Daily Live Streaming</h3>
            <p className="text-muted-foreground">Experience the divine darshan of Baba Baidyanath from anywhere in the world through our live streaming service.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDarshanSection;
