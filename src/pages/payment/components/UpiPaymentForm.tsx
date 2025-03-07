
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlarmClock } from 'lucide-react';

interface UpiPaymentFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  processing: boolean;
  totalAmount: number;
}

const UpiPaymentForm: React.FC<UpiPaymentFormProps> = ({
  handleSubmit,
  processing,
  totalAmount
}) => {
  return (
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
              `Pay ₹${totalAmount}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UpiPaymentForm;
