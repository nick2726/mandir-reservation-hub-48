
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface NetBankingFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  processing: boolean;
  totalAmount: number;
}

const NetBankingForm: React.FC<NetBankingFormProps> = ({
  handleSubmit,
  processing,
  totalAmount
}) => {
  return (
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
              `Pay ₹${totalAmount}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NetBankingForm;
