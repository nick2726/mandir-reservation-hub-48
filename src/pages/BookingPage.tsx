
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CalendarIcon, InfoIcon, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

// Mock pass data lookup (typically would be fetched from an API)
const mockPassesData = [
  {
    id: 1,
    type: "Standard",
    date: new Date('2023-08-05'),
    price: 500,
    availableSlots: 45,
    totalSlots: 100,
    description: "Standard entry pass for Babadham Mandir. Valid for the selected date only.",
  },
  {
    id: 2,
    type: "Premium",
    date: new Date('2023-08-05'),
    price: 1000,
    availableSlots: 15,
    totalSlots: 30,
    description: "Premium pass with priority entry and special darshan. Valid for the selected date only.",
  },
  {
    id: 3,
    type: "Standard",
    date: new Date('2023-08-06'),
    price: 500,
    availableSlots: 60,
    totalSlots: 100,
    description: "Standard entry pass for Babadham Mandir. Valid for the selected date only.",
  },
  {
    id: 4,
    type: "Premium",
    date: new Date('2023-08-06'),
    price: 1000,
    availableSlots: 20,
    totalSlots: 30,
    description: "Premium pass with priority entry and special darshan. Valid for the selected date only.",
  },
];

interface Pass {
  id: number;
  type: string;
  date: Date;
  price: number;
  availableSlots: number;
  totalSlots: number;
  description: string;
}

const BookingPage = () => {
  const { passId } = useParams<{ passId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [pass, setPass] = useState<Pass | null>(null);
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idType: 'aadhar',
    idNumber: '',
  });
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundPass = mockPassesData.find(p => p.id === Number(passId));
      if (foundPass) {
        setPass(foundPass);
      } else {
        toast({
          title: "Pass not found",
          description: "The requested pass could not be found.",
          variant: "destructive",
        });
        navigate('/passes');
      }
      setLoading(false);
    }, 800);
  }, [passId, navigate, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleVisitorChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      if (pass && visitors < pass.availableSlots) {
        setVisitors(prev => prev + 1);
      } else {
        toast({
          title: "Maximum limit reached",
          description: "Cannot book more than available slots.",
          variant: "destructive",
        });
      }
    } else {
      if (visitors > 1) {
        setVisitors(prev => prev - 1);
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a mock booking ID
    const bookingId = Math.floor(100000 + Math.random() * 900000);
    
    // Navigate to payment page with the booking ID
    navigate(`/payment/${bookingId}`);
  };
  
  if (loading) {
    return (
      <div className="pt-24 container">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Loading pass details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!pass) {
    return (
      <div className="pt-24 container">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <p className="text-xl font-semibold">Pass not found</p>
            <Button onClick={() => navigate('/passes')} className="mt-4">Back to Passes</Button>
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
        <Button 
          variant="ghost" 
          className="mb-6 pl-0"
          onClick={() => navigate('/passes')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Passes
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-muted-foreground mb-8">Enter visitor information and confirm your reservation</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
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
                
                <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md flex items-start">
                  <InfoIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Payment will be processed in the next step. Your booking is not confirmed until payment is complete.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Visitor Information Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Information</CardTitle>
                <CardDescription>Please provide details for the primary visitor</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="idType">ID Type</Label>
                      <Select
                        defaultValue={formData.idType}
                        onValueChange={(value) => handleSelectChange('idType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aadhar">Aadhar Card</SelectItem>
                          <SelectItem value="pan">PAN Card</SelectItem>
                          <SelectItem value="voter">Voter ID</SelectItem>
                          <SelectItem value="driving">Driving License</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">ID Number</Label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        placeholder="Enter your ID number"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {visitors > 1 && (
                      <p className="mb-2">You are booking for {visitors} visitors. Only primary visitor details are required at this stage.</p>
                    )}
                    <p>ID proof will be required at the time of entry.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Continue to Payment</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingPage;
