
import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Share2, Mail, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useBookingData } from './hooks/useBookingData';
import { generatePDF } from './utils/pdfUtils';
import { MobilePass } from './components/MobilePass';
import { DetailedPass } from './components/DetailedPass';
import { BookingInfo } from './components/BookingInfo';
import { LoadingState } from './components/LoadingState';
import { NotFoundState } from './components/NotFoundState';

const ConfirmationPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { loading, bookingDetails } = useBookingData(bookingId);
  const passRef = useRef<HTMLDivElement>(null);
  const detailedPassRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadPDF = async () => {
    if (!detailedPassRef.current || !bookingDetails) return;
    
    await generatePDF(detailedPassRef.current, `Babadham_Pass_${bookingId}.pdf`, {
      toast,
      loadingMessage: "Your detailed pass is being prepared for download...",
      successMessage: "Your detailed pass has been downloaded successfully.",
      errorMessage: "There was an error generating your pass. Please try again."
    });
  };
  
  const handleDownloadMobilePass = async () => {
    if (!passRef.current || !bookingDetails) return;
    
    await generatePDF(passRef.current, `Babadham_MobilePass_${bookingId}.pdf`, {
      format: [85, 150],
      toast,
      loadingMessage: "Your mobile pass is being prepared for download...",
      successMessage: "Your mobile pass has been downloaded successfully.",
      errorMessage: "There was an error generating your mobile pass. Please try again."
    });
  };
  
  const handleShare = () => {
    // Share functionality using Web Share API if available
    if (navigator.share && bookingDetails) {
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
        <LoadingState />
      </div>
    );
  }
  
  if (!bookingDetails) {
    return (
      <div className="pt-24 container">
        <NotFoundState />
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
                <BookingInfo 
                  bookingDetails={bookingDetails} 
                  handleDownloadMobilePass={handleDownloadMobilePass}
                  handleDownloadPDF={handleDownloadPDF}
                />
                
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
            <MobilePass bookingDetails={bookingDetails} passRef={passRef} />
          </div>
        </div>
        
        {/* Hidden detailed pass for PDF generation */}
        <DetailedPass bookingDetails={bookingDetails} detailedPassRef={detailedPassRef} />
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
