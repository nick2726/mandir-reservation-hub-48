
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Pass types
export interface Pass {
  id: number;
  type: string;
  date: Date;
  price: number;
  availableSlots: number;
  totalSlots: number;
  description: string;
  status?: 'available' | 'limited' | 'sold_out';
  lastUpdated?: Date;
}

// Mock data for passes (in a real app, this would come from an API)
const mockPasses = [
  {
    id: 1,
    type: "Standard",
    date: new Date('2023-08-05'),
    price: 500,
    availableSlots: 45,
    totalSlots: 100,
    description: "Standard entry pass for Babadham Mandir. Valid for the selected date only.",
    lastUpdated: new Date(),
  },
  {
    id: 2,
    type: "VIP",
    date: new Date('2023-08-05'),
    price: 600,
    availableSlots: 15,
    totalSlots: 30,
    description: "VIP pass with priority entry and special darshan. Valid for the selected date only.",
    lastUpdated: new Date(),
  },
  {
    id: 3,
    type: "Standard",
    date: new Date('2023-08-06'),
    price: 500,
    availableSlots: 60,
    totalSlots: 100,
    description: "Standard entry pass for Babadham Mandir. Valid for the selected date only.",
    lastUpdated: new Date(),
  },
  {
    id: 4,
    type: "VIP",
    date: new Date('2023-08-06'),
    price: 600,
    availableSlots: 20,
    totalSlots: 30,
    description: "VIP pass with priority entry and special darshan. Valid for the selected date only.",
    lastUpdated: new Date(),
  },
  {
    id: 5,
    type: "Standard",
    date: new Date('2023-08-07'),
    price: 500,
    availableSlots: 75,
    totalSlots: 100,
    description: "Standard entry pass for Babadham Mandir. Valid for the selected date only.",
    lastUpdated: new Date(),
  },
  {
    id: 6,
    type: "VIP",
    date: new Date('2023-08-07'),
    price: 600,
    availableSlots: 25,
    totalSlots: 30,
    description: "VIP pass with priority entry and special darshan. Valid for the selected date only.",
    lastUpdated: new Date(),
  },
];

// Simulate real-time updates
let simulatedPasses = [...mockPasses];

// This function would be replaced with a real WebSocket or polling implementation
const setupRealTimeConnection = (onUpdate: (passes: Pass[]) => void) => {
  // Simulate real-time updates every few seconds
  const interval = setInterval(() => {
    // Randomly update some passes to simulate real-time changes
    simulatedPasses = simulatedPasses.map(pass => {
      // 25% chance of updating a pass
      if (Math.random() < 0.25) {
        // Random change in available slots (decrease by 1-3)
        const change = Math.max(1, Math.floor(Math.random() * 4));
        const newAvailableSlots = Math.max(0, pass.availableSlots - change);
        
        if (newAvailableSlots !== pass.availableSlots) {
          return {
            ...pass,
            availableSlots: newAvailableSlots,
            lastUpdated: new Date(),
          };
        }
      }
      return pass;
    });
    
    // Add status based on availability
    const updatedPasses = simulatedPasses.map(pass => ({
      ...pass,
      status: getPassStatus(pass)
    }));
    
    onUpdate(updatedPasses);
  }, 5000); // Update every 5 seconds
  
  return () => clearInterval(interval);
};

// Function to determine pass status based on availability
export const getPassStatus = (pass: Pass): 'available' | 'limited' | 'sold_out' => {
  const availability = (pass.availableSlots / pass.totalSlots) * 100;
  if (pass.availableSlots === 0) return 'sold_out';
  if (availability <= 20) return 'limited';
  return 'available';
};

// Custom hook for real-time pass data
export const usePassData = () => {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate initial data fetch
    setTimeout(() => {
      simulatedPasses = mockPasses.map(pass => ({
        ...pass,
        status: getPassStatus(pass)
      }));
      setPasses(simulatedPasses);
      setIsLoading(false);
      
      toast({
        title: "Connected to booking system",
        description: "You're now seeing real-time pass availability",
      });
    }, 1000);
    
    // Setup real-time updates
    const cleanup = setupRealTimeConnection((updatedPasses) => {
      setPasses(updatedPasses);
    });
    
    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, []);
  
  // Get a single pass by ID
  const getPassById = (id: number) => {
    return passes.find(pass => pass.id === id) || null;
  };
  
  // Book a pass (reduce available slots)
  const bookPass = (id: number, quantity: number = 1) => {
    setPasses(currentPasses => 
      currentPasses.map(pass => {
        if (pass.id === id) {
          const newAvailableSlots = Math.max(0, pass.availableSlots - quantity);
          return {
            ...pass,
            availableSlots: newAvailableSlots,
            status: newAvailableSlots === 0 ? 'sold_out' : pass.status,
            lastUpdated: new Date()
          };
        }
        return pass;
      })
    );
    
    return true; // Success
  };
  
  return {
    passes,
    isLoading,
    error,
    getPassById,
    bookPass
  };
};
