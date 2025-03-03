
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Check, CreditCard, ChevronRight, Lock, AlarmClock, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock booking data (typically would be fetched from an API based on bookingId)
const mockBookingData = {
  id: '123456',
  passType: 'Premium',
  date: new Date('2023-08-05'),
  visitors: 2,
  pricePerPerson: 1000,
  totalAmount: 2000,
  name: 'John Doe',
  email: 'john.doe@example.com',
};

// Payment method Icons
const PaymentMethodIcon = ({ method }: { method: string }) => {
  switch (method) {
    case 'card':
      return <CreditCard className="h-5 w-5" />;
    case 'upi':
      return <div className="text-sm font-semibold">UPI</div>;
    case 'netbanking':
      return <div className="text-sm font-semibold">Net</div>;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};

const PaymentPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Card details form state
  const [cardForm, setCardForm] = useState({
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
  
  if (loading) {
    return (
      <div className="pt-24 container">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!bookingDetails) {
    return (
      <div className="pt-24 container">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <p className="text-xl font-semibold">Booking not found</p>
            <Button onClick={() => navigate('/passes')} className="mt-4">Browse Passes</Button>
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
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className={`flex items-center space-x-3 rounded-md border p-4 ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex flex-1 items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="bg-secondary w-8 h-8 rounded-md flex items-center justify-center">
                          <PaymentMethodIcon method="card" />
                        </div>
                        <div>
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-xs text-muted-foreground">Pay using Visa, Mastercard or RuPay</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 rounded-md border p-4 ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex flex-1 items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="bg-secondary w-8 h-8 rounded-md flex items-center justify-center">
                          <PaymentMethodIcon method="upi" />
                        </div>
                        <div>
                          <p className="font-medium">UPI Payment</p>
                          <p className="text-xs text-muted-foreground">Pay using Google Pay, PhonePe, or any UPI app</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 rounded-md border p-4 ${paymentMethod === 'netbanking' ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex flex-1 items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="bg-secondary w-8 h-8 rounded-md flex items-center justify-center">
                          <PaymentMethodIcon method="netbanking" />
                        </div>
                        <div>
                          <p className="font-medium">Net Banking</p>
                          <p className="text-xs text-muted-foreground">Pay directly from your bank account</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            {/* Card Details Form - Only shown if card payment method is selected */}
            {paymentMethod === 'card' && (
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                  <CardDescription>Enter your card information securely</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardForm.cardNumber}
                        onChange={handleCardInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="Name as shown on card"
                        value={cardForm.cardName}
                        onChange={handleCardInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardForm.expiryDate}
                          onChange={handleCardInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          type="text"
                          placeholder="123"
                          value={cardForm.cvv}
                          onChange={handleCardInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                      <Lock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <p>Your payment information is encrypted and secure. We never store your card details.</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                          Processing...
                        </>
                      ) : (
                        `Pay ₹${bookingDetails.totalAmount}`
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
            
            {/* UPI Payment - Only shown if UPI payment method is selected */}
            {paymentMethod === 'upi' && (
              <Card>
                <CardHeader>
                  <CardTitle>UPI Payment</CardTitle>
                  <CardDescription>Pay using any UPI app</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Enter your UPI ID (e.g., name@okaxis, number@ybl)</p>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                      <AlarmClock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <p>You will receive a payment request on your UPI app. Please accept it to complete the transaction.</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                          Processing...
                        </>
                      ) : (
                        `Pay ₹${bookingDetails.totalAmount}`
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
            
            {/* Net Banking - Only shown if Net Banking payment method is selected */}
            {paymentMethod === 'netbanking' && (
              <Card>
                <CardHeader>
                  <CardTitle>Net Banking</CardTitle>
                  <CardDescription>Pay from your bank account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Your Bank</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'Other'].map((bank) => (
                          <div key={bank} className="border rounded-md p-3 text-center cursor-pointer hover:border-primary hover:bg-primary/5">
                            {bank}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                      <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
                      <p>You will be redirected to your bank's secure payment gateway to complete the transaction.</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                          Processing...
                        </>
                      ) : (
                        `Pay ₹${bookingDetails.totalAmount}`
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Booking #{bookingId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">{bookingDetails.passType} Pass</div>
                  <div className="text-sm text-muted-foreground">
                    {bookingDetails.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Visitors</span>
                  <span>{bookingDetails.visitors}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Price per person</span>
                  <span>₹{bookingDetails.pricePerPerson}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center font-medium">
                  <span>Total Amount</span>
                  <span>₹{bookingDetails.totalAmount}</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p>Booked for: {bookingDetails.name}</p>
                  <p className="mt-1">Email: {bookingDetails.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
