
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Separator } from '@/components/ui/separator';
import { BookingDetails } from '../types';

interface MobilePassProps {
  bookingDetails: BookingDetails;
  passRef: React.RefObject<HTMLDivElement>;
}

export const MobilePass: React.FC<MobilePassProps> = ({ bookingDetails, passRef }) => {
  return (
    <div ref={passRef} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-primary p-4 text-white text-center">
        <h3 className="text-lg font-semibold">Babadham Mandir</h3>
        <p className="text-sm opacity-90">Entry Pass</p>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex justify-center">
          <QRCodeSVG 
            value={`BABADHAM-${bookingDetails.id}-${bookingDetails.visitorInfo.name}-${bookingDetails.date.toISOString().split('T')[0]}`} 
            size={150} 
            level="H"
            includeMargin={true}
          />
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Booking ID</p>
          <p className="font-mono font-bold">{bookingDetails.id}</p>
        </div>
        
        <Separator />
        
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Visitor</p>
            <p className="font-medium">{bookingDetails.visitorInfo.name}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground text-xs">Date</p>
              <p className="font-medium">
                {bookingDetails.date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Type</p>
              <p className="font-medium">{bookingDetails.passType}</p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground text-xs">Visitors</p>
              <p className="font-medium">{bookingDetails.visitors}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Amount Paid</p>
              <p className="font-medium">₹{bookingDetails.totalAmount}</p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="text-center text-xs text-muted-foreground">
          <p>Please show this pass at the entrance.</p>
          <p>Valid ID proof required for entry.</p>
        </div>
      </div>
    </div>
  );
};
