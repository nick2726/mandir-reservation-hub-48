
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { PaymentFormData, MockBookingData } from '../types';

// Mock booking data (typically would be fetched from an API based on bookingId)
const mockBookingData: MockBookingData = {
  id: '123456',
  passType: 'Premium',
  date: new Date('2023-08-05'),
  visitors: 2,
  pricePerPerson: 1000,
  totalAmount: 2000,
  name: 'John Doe',
  email: 'john.doe@example.com',
};

export const usePaymentLogic = (bookingId: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<MockBookingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Card details form state
  const [cardForm, setCardForm] = useState<PaymentFormData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  useEffect(() => {
    // Simulate API fetch for booking details
    setTimeout(() => {
      setBookingDetails(mockBookingData);
      setLoading(false);
    }, 800);
  }, [bookingId]);
  
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number to include spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')  // Remove any existing spaces
        .replace(/\D/g, '')  // Remove any non-digits
        .slice(0, 16)        // Limit to 16 digits
        .replace(/(\d{4})(?=\d)/g, '$1 ');  // Add a space after every 4 digits
      
      setCardForm(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date (MM/YY)
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')  // Remove any non-digits
        .slice(0, 4)         // Limit to 4 digits (MMYY)
        .replace(/(\d{2})(?=\d)/g, '$1/');  // Add a / after 2 digits
      
      setCardForm(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Limit CVV to 3 digits
    if (name === 'cvv') {
      const formattedValue = value
        .replace(/\D/g, '')  // Remove any non-digits
        .slice(0, 3);        // Limit to 3 digits
      
      setCardForm(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setCardForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      
      // Simulate successful payment
      navigate(`/confirmation/${bookingId}`);
      
      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed.",
      });
    }, 2000);
  };

  return {
    loading,
    processing,
    bookingDetails,
    paymentMethod,
    setPaymentMethod,
    cardForm,
    handleCardInputChange,
    handleSubmit
  };
};
