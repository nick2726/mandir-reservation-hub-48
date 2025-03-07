
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';

// Import components
import PaymentMethodSelector from './components/PaymentMethodSelector';
import CardPaymentForm from './components/CardPaymentForm';
import UpiPaymentForm from './components/UpiPaymentForm';
import NetBankingForm from './components/NetBankingForm';
import OrderSummary from './components/OrderSummary';
import LoadingState from './components/LoadingState';
import NotFoundState from './components/NotFoundState';

// Import hooks
import { usePaymentLogic } from './hooks/usePaymentLogic';

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  
  const {
    loading,
    processing,
    bookingDetails,
    paymentMethod,
    setPaymentMethod,
    cardForm,
    handleCardInputChange,
    handleSubmit
  } = usePaymentLogic(bookingId);
  
  if (loading) {
    return (
      <div className="pt-24 container">
        <LoadingState />
      </div>
    );
  }
  
  if (!bookingDetails) {
    return (
      <div className="pt-24 container">
        <NotFoundState />
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
          onClick={() => navigate(-1)}
          disabled={processing}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Complete Payment</h1>
            <p className="text-muted-foreground">Secure payment for your booking</p>
          </div>
          <div className="hidden md:flex items-center text-sm text-muted-foreground">
            <span className="flex items-center mr-2">
              <Check className="h-3.5 w-3.5 mr-1 text-primary" />
              Booking Details
            </span>
            <ChevronRight className="h-3.5 w-3.5 mx-1" />
            <span className="font-medium">Payment</span>
            <ChevronRight className="h-3.5 w-3.5 mx-1" />
            <span className="text-muted-foreground">Confirmation</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="md:col-span-2 space-y-6">
            <PaymentMethodSelector 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            
            {/* Render payment form based on selected method */}
            {paymentMethod === 'card' && (
              <CardPaymentForm 
                cardForm={cardForm}
                handleCardInputChange={handleCardInputChange}
                handleSubmit={handleSubmit}
                processing={processing}
                totalAmount={bookingDetails.totalAmount}
              />
            )}
            
            {paymentMethod === 'upi' && (
              <UpiPaymentForm 
                handleSubmit={handleSubmit}
                processing={processing}
                totalAmount={bookingDetails.totalAmount}
              />
            )}
            
            {paymentMethod === 'netbanking' && (
              <NetBankingForm
                handleSubmit={handleSubmit}
                processing={processing}
                totalAmount={bookingDetails.totalAmount}
              />
            )}
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <OrderSummary 
              bookingDetails={bookingDetails}
              bookingId={bookingId}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
