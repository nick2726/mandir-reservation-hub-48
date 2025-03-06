
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Pass } from '@/hooks/usePassData';

export const useVisitorCount = (pass: Pass) => {
  const [visitors, setVisitors] = useState<number>(1);
  const { toast } = useToast();
  
  const handleVisitorChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      if (visitors < pass.availableSlots) {
        setVisitors(prev => prev + 1);
        toast({
          title: "Visitor Added",
          description: `Booking for ${visitors + 1} visitors.`,
          duration: 2000,
        });
      } else {
        toast({
          title: "Maximum limit reached",
          description: "Cannot book more than available slots.",
          variant: "destructive",
        });
      }
    } else {
      if (visitors > 1) {
        setVisitors(prev => prev - 1);
        toast({
          title: "Visitor Removed",
          description: `Now booking for ${visitors - 1} visitors.`,
          duration: 2000,
        });
      }
    }
  };
  
  return {
    visitors,
    setVisitors,
    handleVisitorChange
  };
};
