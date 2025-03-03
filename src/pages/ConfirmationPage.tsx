
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Download, Home, Share2, Smartphone, Mail, Check } from 'lucide-react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/components/ui/use-toast';

// Mock booking data (typically would be fetched from an API based on bookingId)
const mockBookingData = {
  id: '123456',
  passType: 'Premium',
  date: new Date('2023-08-05'),
  visitors: 2,
  pricePerPerson: 1000,
  totalAmount: 2000,
  name: 'John Doe',
  email: 'john.doe@example.com',
  bookingTime: new Date(),
};

const ConfirmationPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const passRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate API fetch for booking details
    setTimeout(() => {
      setBookingDetails(mockBookingData);
      setLoading(false);
    }, 800);
  }, [bookingId]);
  
  const handleDownloadPDF = async () => {
    if (!passRef.current) return;
    
    toast({
      title: "Generating PDF",
      description: "Your pass is being prepared for download...",
    });
    
    try {
      const canvas = await html2canvas(passRef.current, { 
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Babadham_Pass_${bookingId}.pdf`);
      
      toast({
        title: "Pass Downloaded",
        description: "Your pass has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your pass. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = () => {
    // Share functionality using Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'My Babadham Mandir Pass',
        text: `I've booked a visit to Babadham Mandir on ${bookingDetails.date.toLocaleDateString()}. Booking ID: ${bookingId}`,
        url: window.location.href,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the share functionality. Copy the link manually.",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="pt-24 container">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!bookingDetails) {
    return (
      <div className="pt-24 container">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <p className="text-xl font-semibold">Booking not found</p>
            <Button onClick={() => navigate('/passes')} className="mt-4">Browse Passes</Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 container max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Booking Confirmed</h1>
            <p className="text-muted-foreground">Your pass has been booked successfully</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => navigate('/passes')}>
              <Home className="mr-2 h-4 w-4" />
              Browse More Passes
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Booking Confirmation */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 text-green-700 p-1.5 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>Booking Confirmed!</CardTitle>
                    <CardDescription>Thank you for your booking</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Booking ID</p>
                      <p className="font-medium">{bookingId}</p>
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
                      <p className="font-medium">{bookingDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{bookingDetails.email}</p>
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
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary p-1.5 rounded-full mr-3 mt-0.5">
                        <Smartphone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Bring your ID proof</p>
                        <p className="text-sm text-muted-foreground">The ID proof used during booking must be presented at entry.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button onClick={handleDownloadPDF} className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download Pass PDF
                  </Button>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-md">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <p className="text-sm">
                      A copy of this pass has been sent to your email address. 
                      Please check your inbox (and spam folder) if you don't see it.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Digital Pass Preview */}
          <div className="md:col-span-1">
            <div ref={passRef} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-primary p-4 text-white text-center">
                <h3 className="text-lg font-semibold">Babadham Mandir</h3>
                <p className="text-sm opacity-90">Entry Pass</p>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-center">
                  <QRCode 
                    value={`BABADHAM-${bookingId}`} 
                    size={150} 
                    level="H"
                    includeMargin={true}
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Booking ID</p>
                  <p className="font-mono font-bold">{bookingId}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Visitor</p>
                    <p className="font-medium">{bookingDetails.name}</p>
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
