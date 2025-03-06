
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, InfoIcon, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Pass } from '@/hooks/usePassData';
import { useToast } from '@/hooks/use-toast';

interface OrderSummaryProps {
  pass: Pass;
  visitors: number;
  handleVisitorChange: (action: 'increase' | 'decrease') => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ pass, visitors, handleVisitorChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your pass details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{pass.type} Pass</h3>
          <div className="flex items-center text-muted-foreground mt-1">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{format(pass.date, 'EEEE, MMMM d, yyyy')}</span>
          </div>
          
          {/* Real-time update indicator */}
          {pass.lastUpdated && (Date.now() - pass.lastUpdated.getTime() < 5000) && (
            <div className="flex items-center text-xs text-amber-600 mt-2 animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              <span>Availability recently updated</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Price per person</span>
          <span className="font-medium">₹{pass.price}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Number of visitors</span>
          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleVisitorChange('decrease')}
              disabled={visitors <= 1}
            >
              -
            </Button>
            <span className="w-8 text-center">{visitors}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleVisitorChange('increase')}
              disabled={pass && visitors >= pass.availableSlots}
            >
              +
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center font-semibold">
          <span>Total</span>
          <span>₹{pass.price * visitors}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Available slots</span>
          <span className={`font-medium ${pass.availableSlots <= 5 ? 'text-amber-600' : ''}`}>
            {pass.availableSlots} of {pass.totalSlots}
          </span>
        </div>
        
        <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md flex items-start">
          <InfoIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>Payment will be processed in the next step. Your booking is not confirmed until payment is complete.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
