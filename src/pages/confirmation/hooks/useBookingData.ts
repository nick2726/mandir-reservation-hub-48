
import { useState, useEffect } from 'react';
import { BookingDetails } from '../types';

export const useBookingData = (bookingId: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        // First try to get from localStorage (for demo purposes)
        const storedBookingData = localStorage.getItem(`booking_${bookingId}`);
        
        if (storedBookingData) {
          const parsedData = JSON.parse(storedBookingData);
          // Convert string dates back to Date objects
          parsedData.date = new Date(parsedData.date);
          parsedData.bookingTime = new Date(parsedData.bookingTime);
          
          setBookingDetails(parsedData);
          setLoading(false);
          return;
        }
        
        // If not in localStorage, we would fetch from Supabase in a real app
        // For demo, we'll use fallback data but with current time/date
        const fallbackData: BookingDetails = {
          id: bookingId || '123456',
          passType: 'Premium',
          date: new Date(),
          visitors: 2,
          pricePerPerson: 1000,
          totalAmount: 2000,
          visitorInfo: {
            name: 'Your Name', // Default name if real data not available
            email: 'your.email@example.com',
            phone: '+91 9876543210',
            state: 'Jharkhand',
            city: 'Deoghar',
            priestName: 'Pandit Ramesh Kumar',
            tokenNo: 'TK-4578',
            idProofType: 'Aadhar Card',
            idProofNumber: 'XXXX-XXXX-7890'
          },
          bookingTime: new Date(),
        };
        
        setBookingDetails(fallbackData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setLoading(false);
      }
    };
    
    fetchBookingData();
  }, [bookingId]);
  
  return { loading, bookingDetails };
};
