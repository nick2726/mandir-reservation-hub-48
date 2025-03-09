
import { useState, useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { PaymentData } from '../types';

export const usePaymentLogic = (
  bookingId: string | undefined, 
  navigate: NavigateFunction,
  toast: any
) => {
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<PaymentData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // In a real app, we would fetch from an API
        // For demo purposes, we'll simulate the data
        
        // Check if there's data in localStorage first (for our demo)
        const storedData = localStorage.getItem(`booking_${bookingId}`);
        if (storedData) {
          setBookingData(JSON.parse(storedData));
          setLoading(false);
          return;
        }
        
        // If no stored data, generate mock data
        setTimeout(() => {
          const mockData: PaymentData = {
            id: bookingId || '123456',
            passType: 'VIP',
            date: new Date(),
            visitors: 2,
            pricePerPerson: 600,
            totalAmount: 1200,
            visitorInfo: {
              name: 'John Doe',
              email: 'john.doe@example.com',
              phone: '9876543210',
              state: 'Maharashtra',
              city: 'Mumbai',
              priestName: 'Pandit Ramesh',
              tokenNo: 'TK-4578',
              idProofType: 'Aadhar Card',
              idProofNumber: 'XXXX-XXXX-1234'
            },
            additionalMembers: [
              {
                name: 'Jane Doe',
                age: 28,
                sex: 'female',
                idProofType: 'Aadhar Card',
                idProofNumber: 'XXXX-XXXX-5678'
              }
            ]
          };
          
          setBookingData(mockData);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching booking data:', error);
        setLoading(false);
      }
    };
    
    fetchBookingData();
  }, [bookingId]);
  
  const handleProcessPayment = async (method: string) => {
    setIsProcessing(true);
    
    // Toast to indicate processing
    toast({
      title: "Processing Payment",
      description: `Processing your ${method} payment...`,
    });
    
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Success toast
    toast({
      title: "Payment Successful",
      description: method === 'Cash on Delivery' 
        ? "Your booking is confirmed. Please pay at the temple entrance."
        : "Your payment has been processed successfully.",
    });
    
    // Store the booking data with payment method in localStorage for demo purposes
    if (bookingData) {
      const confirmedBooking = {
        ...bookingData,
        bookingTime: new Date(),
        paymentMethod: method
      };
      
      localStorage.setItem(`booking_${bookingId}`, JSON.stringify(confirmedBooking));
    }
    
    setIsProcessing(false);
    
    // Navigate to confirmation page
    setTimeout(() => {
      navigate(`/confirmation/${bookingId}`);
    }, 1000);
  };
  
  return { bookingData, loading, handleProcessPayment, isProcessing };
};
