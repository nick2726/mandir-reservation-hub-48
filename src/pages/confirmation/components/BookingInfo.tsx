
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar, Download, QrCode, FileText } from 'lucide-react';
import { BookingDetails } from '../types';

interface BookingInfoProps {
  bookingDetails: BookingDetails;
  handleDownloadMobilePass: () => Promise<void>;
  handleDownloadPDF: () => Promise<void>;
}

export const BookingInfo: React.FC<BookingInfoProps> = ({ 
  bookingDetails, 
  handleDownloadMobilePass, 
  handleDownloadPDF 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Booking ID</p>
            <p className="font-medium">{bookingDetails.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date of Visit</p>
            <p className="font-medium">
              {bookingDetails.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pass Type</p>
            <p className="font-medium">{bookingDetails.passType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Number of Visitors</p>
            <p className="font-medium">{bookingDetails.visitors}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Booked By</p>
            <p className="font-medium">{bookingDetails.visitorInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{bookingDetails.visitorInfo.email}</p>
          </div>
        </div>
      </div>

      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Visitor Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{bookingDetails.visitorInfo.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">State</p>
            <p className="font-medium">{bookingDetails.visitorInfo.state}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">City</p>
            <p className="font-medium">{bookingDetails.visitorInfo.city}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Priest Name</p>
            <p className="font-medium">{bookingDetails.visitorInfo.priestName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Token Number</p>
            <p className="font-medium">{bookingDetails.visitorInfo.tokenNo}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ID Proof</p>
            <p className="font-medium">{bookingDetails.visitorInfo.idProofType} ({bookingDetails.visitorInfo.idProofNumber})</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-primary/10 text-primary p-1.5 rounded-full mr-3 mt-0.5">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Download your pass</p>
              <p className="text-sm text-muted-foreground">Download and print your pass or keep it on your mobile phone.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary/10 text-primary p-1.5 rounded-full mr-3 mt-0.5">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Arrive at the venue on time</p>
              <p className="text-sm text-muted-foreground">Please arrive at least 30 minutes before your scheduled time.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={handleDownloadMobilePass} className="mt-4">
          <QrCode className="mr-2 h-4 w-4" />
          Download Mobile Pass
        </Button>
        
        <Button onClick={handleDownloadPDF} className="mt-4">
          <FileText className="mr-2 h-4 w-4" />
          Download Detailed PDF
        </Button>
      </div>
    </div>
  );
};
