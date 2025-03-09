
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertTriangle } from 'lucide-react';

interface CashPaymentFormProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

export const CashPaymentForm: React.FC<CashPaymentFormProps> = ({ onSubmit, isProcessing }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash on Delivery</CardTitle>
        <CardDescription>Pay in cash when you arrive at the temple</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-amber-800">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Important Information</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• You must pay the full amount in cash at the temple entrance.</li>
                <li>• Bring the exact amount as change may not be available.</li>
                <li>• Have your booking ID and ID proof ready for verification.</li>
                <li>• Arrive at least 30 minutes before your scheduled time.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 p-4 rounded-md text-green-800">
          <div className="flex items-start">
            <Check className="h-5 w-5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Booking Process</p>
              <p className="text-sm mt-2">
                By clicking "Confirm Booking", you are agreeing to pay the full amount in cash at the temple entrance. 
                Your booking will be confirmed and a pass will be generated that you can present at the entrance.
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onSubmit} 
          className="w-full" 
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Confirm Booking"}
        </Button>
      </CardContent>
    </Card>
  );
};
