
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { PaymentFormData } from '../types';

interface CardPaymentFormProps {
  cardForm: PaymentFormData;
  handleCardInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  processing: boolean;
  totalAmount: number;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  cardForm,
  handleCardInputChange,
  handleSubmit,
  processing,
  totalAmount
}) => {
  return (
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
              `Pay ₹${totalAmount}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CardPaymentForm;
