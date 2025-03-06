
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { BookingDetails } from '../types';

interface DetailedPassProps {
  bookingDetails: BookingDetails;
  detailedPassRef: React.RefObject<HTMLDivElement>;
}

export const DetailedPass: React.FC<DetailedPassProps> = ({ bookingDetails, detailedPassRef }) => {
  return (
    <div className="hidden">
      <div ref={detailedPassRef} className="bg-white w-[800px] p-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary">Babadham Mandir</h2>
            <p className="text-sm text-muted-foreground">Official Entry Pass</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Booking ID: {bookingDetails.id}</p>
            <p className="text-sm text-muted-foreground">Issued: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Visitor Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{bookingDetails.visitorInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{bookingDetails.visitorInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{bookingDetails.visitorInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">State & City</p>
                <p className="font-medium">{bookingDetails.visitorInfo.city}, {bookingDetails.visitorInfo.state}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID Proof</p>
                <p className="font-medium">{bookingDetails.visitorInfo.idProofType} ({bookingDetails.visitorInfo.idProofNumber})</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mt-6 mb-4">Temple Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Priest Name</p>
                <p className="font-medium">{bookingDetails.visitorInfo.priestName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Token Number</p>
                <p className="font-medium">{bookingDetails.visitorInfo.tokenNo}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Pass Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Pass Type</p>
                <p className="font-medium">{bookingDetails.passType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Visit</p>
                <p className="font-medium">
                  {bookingDetails.date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Number of Visitors</p>
                <p className="font-medium">{bookingDetails.visitors}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Per Person Price</p>
                <p className="font-medium">₹{bookingDetails.pricePerPerson}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount Paid</p>
                <p className="font-medium">₹{bookingDetails.totalAmount}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <div>
                <QRCodeSVG 
                  value={`BABADHAM-${bookingDetails.id}-${bookingDetails.visitorInfo.name}-${bookingDetails.date.toISOString().split('T')[0]}`} 
                  size={180} 
                  level="H"
                  includeMargin={true}
                />
                <p className="text-center text-sm mt-2">Scan for verification</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-semibold mb-2">Important Instructions:</h4>
            <ul className="text-sm space-y-1">
              <li>• Please arrive at least 30 minutes before your scheduled visit.</li>
              <li>• Bring the original ID proof used during booking for verification.</li>
              <li>• This pass is valid only for the date mentioned above.</li>
              <li>• Photography may be restricted in certain areas.</li>
              <li>• Follow all temple guidelines and staff instructions.</li>
            </ul>
          </div>
          
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>Issued by Babadham Mandir Trust</p>
            <p>For assistance, contact: +91 1234567890 | support@babadhammandir.org</p>
          </div>
        </div>
      </div>
    </div>
  );
};
