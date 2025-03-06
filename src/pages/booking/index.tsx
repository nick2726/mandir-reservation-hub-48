
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePassData } from '@/hooks/usePassData';
import { format } from 'date-fns';
import { useBookingForm } from '@/hooks/useBookingForm';
import { useVisitorCount } from '@/hooks/useVisitorCount';

// Import components
import OrderSummary from './components/OrderSummary';
import VisitorForm from './components/VisitorForm';
import AvailabilityAlert from './components/AvailabilityAlert';

const BookingPage = () => {
  const { passId } = useParams<{ passId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getPassById, bookPass, isLoading: passDataLoading } = usePassData();
  
  const [pass, setPass] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Use custom hooks
  const { formData, formErrors, formTouched, handleInputChange, handleSelectChange, validateForm } = useBookingForm();
  
  // Setup real-time pass updates
  useEffect(() => {
    if (!passDataLoading && passId) {
      const currentPass = getPassById(Number(passId));
      
      if (currentPass) {
        setPass(currentPass);
        setLoading(false);
        
        // Welcome toast for booking page
        toast({
          title: `Booking ${currentPass.type} Pass`,
          description: `For ${format(currentPass.date, 'EEEE, MMMM d, yyyy')}`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Pass not found",
          description: "The requested pass could not be found.",
          variant: "destructive",
        });
        navigate('/passes');
      }
    }
  }, [passId, navigate, toast, passDataLoading, getPassById]);
  
  // Initialize visitor count hook after pass is loaded
  const { visitors, setVisitors, handleVisitorChange } = pass ? useVisitorCount(pass) : { visitors: 1, setVisitors: () => {}, handleVisitorChange: () => {} };
  
  // Setup an interval to check for pass updates
  useEffect(() => {
    if (!passId) return;
    
    const interval = setInterval(() => {
      const updatedPass = getPassById(Number(passId));
      if (updatedPass) {
        setPass(updatedPass);
        
        // If not enough slots available for current visitor count
        if (updatedPass.availableSlots < visitors) {
          const newVisitorCount = Math.max(1, updatedPass.availableSlots);
          setVisitors(newVisitorCount);
          
          toast({
            title: "Availability changed",
            description: `Only ${updatedPass.availableSlots} slots available. We've adjusted your booking.`,
            variant: "destructive",
          });
        }
        
        // If the pass is now sold out
        if (updatedPass.availableSlots === 0) {
          toast({
            title: "Pass Sold Out",
            description: "This pass is no longer available. You will be redirected to the passes page.",
            variant: "destructive",
          });
          
          // Redirect after a short delay
          setTimeout(() => {
            navigate('/passes');
          }, 3000);
        }
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [passId, visitors, getPassById, toast, navigate, setVisitors]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Form Incomplete",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if pass is still available
    const currentPass = getPassById(Number(passId));
    if (!currentPass || currentPass.availableSlots < visitors) {
      toast({
        title: "Availability changed",
        description: "The pass availability has changed. Please review your booking.",
        variant: "destructive",
      });
      return;
    }
    
    // Success feedback
    toast({
      title: "Booking Successful!",
      description: "Proceeding to payment page...",
      duration: 3000,
    });
    
    // Book the pass (reduce available slots)
    bookPass(Number(passId), visitors);
    
    // Generate a mock booking ID
    const bookingId = Math.floor(100000 + Math.random() * 900000);
    
    // Navigate to payment page with the booking ID
    setTimeout(() => {
      navigate(`/payment/${bookingId}`);
    }, 1500);
  };
  
  if (loading || passDataLoading) {
    return (
      <div className="pt-24 container">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Loading pass details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!pass) {
    return (
      <div className="pt-24 container">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <p className="text-xl font-semibold">Pass not found</p>
            <Button onClick={() => navigate('/passes')} className="mt-4">Back to Passes</Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 container max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="ghost" 
          className="mb-6 pl-0"
          onClick={() => navigate('/passes')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Passes
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-muted-foreground mb-8">Enter visitor information and confirm your reservation</p>
        
        {/* Real-time indicator */}
        <div className="flex items-center mb-4 text-sm text-muted-foreground">
          <div className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Real-time availability updates active</span>
        </div>
        
        <AvailabilityAlert pass={pass} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <OrderSummary 
              pass={pass}
              visitors={visitors}
              handleVisitorChange={handleVisitorChange}
            />
          </div>
          
          {/* Visitor Information Form */}
          <div className="md:col-span-2">
            <VisitorForm
              pass={pass}
              visitors={visitors}
              formData={formData}
              formErrors={formErrors}
              formTouched={formTouched}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingPage;
