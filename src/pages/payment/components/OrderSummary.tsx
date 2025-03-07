
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MockBookingData } from '../types';

interface OrderSummaryProps {
  bookingDetails: MockBookingData;
  bookingId: string | undefined;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ bookingDetails, bookingId }) => {
  return (
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
  );
};

export default OrderSummary;
