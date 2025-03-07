
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

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

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  setPaymentMethod
}) => {
  return (
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
  );
};

export default PaymentMethodSelector;
