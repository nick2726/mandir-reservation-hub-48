
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { PaymentMethodSelector } from './components/PaymentMethodSelector';
import { CardPaymentForm } from './components/CardPaymentForm';
import { UpiPaymentForm } from './components/UpiPaymentForm';
import { NetBankingForm } from './components/NetBankingForm';
import { CashPaymentForm } from './components/CashPaymentForm';
import { OrderSummary } from './components/OrderSummary';
import { LoadingState } from './components/LoadingState';
import { NotFoundState } from './components/NotFoundState';
import { usePaymentLogic } from './hooks/usePaymentLogic';

const PaymentPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  
  const { 
    bookingData, 
    loading, 
    handleProcessPayment, 
    isProcessing 
  } = usePaymentLogic(bookingId, navigate, toast);
  
  const processPaymentWithMethod = () => {
    // Process the payment with the selected method
    const paymentMethodMap: Record<string, string> = {
      'card': 'Credit/Debit Card',
      'upi': 'UPI',
      'netbanking': 'Net Banking',
      'cash': 'Cash on Delivery'
    };
    
    handleProcessPayment(paymentMethodMap[paymentMethod] || paymentMethod);
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (!bookingData) {
    return <NotFoundState />;
  }
  
  return (
    <div className="pt-24 container max-w-4xl pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="ghost" 
          className="mb-6 pl-0"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
        <p className="text-muted-foreground mb-8">Choose a payment method to secure your booking</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <OrderSummary bookingData={bookingData} />
          </div>
          
          {/* Payment Forms */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <PaymentMethodSelector 
                activeMethod={paymentMethod} 
                onChange={setPaymentMethod} 
              />
            </div>
            
            {paymentMethod === 'card' && (
              <CardPaymentForm 
                onSubmit={processPaymentWithMethod} 
                isProcessing={isProcessing} 
              />
            )}
            
            {paymentMethod === 'upi' && (
              <UpiPaymentForm 
                onSubmit={processPaymentWithMethod} 
                isProcessing={isProcessing} 
              />
            )}
            
            {paymentMethod === 'netbanking' && (
              <NetBankingForm 
                onSubmit={processPaymentWithMethod} 
                isProcessing={isProcessing} 
              />
            )}
            
            {paymentMethod === 'cash' && (
              <CashPaymentForm 
                onSubmit={processPaymentWithMethod} 
                isProcessing={isProcessing} 
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
