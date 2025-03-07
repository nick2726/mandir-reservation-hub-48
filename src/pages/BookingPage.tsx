import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CalendarIcon, InfoIcon, Users, Clock, AlertTriangle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { usePassData } from '@/hooks/usePassData';
import type { AdditionalMemberInfo } from '@/pages/confirmation/types';

const BookingPage = () => {
  const { passId } = useParams<{ passId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getPassById, bookPass, isLoading: passDataLoading } = usePassData();
  
  const [pass, setPass] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    priestName: '', // Now mandatory
    tokenNo: '', // Now mandatory
    idType: 'aadhar',
    idNumber: '',
  });

  const [additionalMembers, setAdditionalMembers] = useState<AdditionalMemberInfo[]>([]);
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});
  
  // Setup real-time pass updates
  useEffect(() => {
    if (!passDataLoading && passId) {
      const currentPass = getPassById(Number(passId));
      
      if (currentPass) {
        setPass(currentPass);
        setLoading(false);
        
        // Welcome toast for booking page
        toast({
          title: `Booking ${currentPass.type} Pass`,
          description: `For ${format(currentPass.date, 'EEEE, MMMM d, yyyy')}`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Pass not found",
          description: "The requested pass could not be found.",
          variant: "destructive",
        });
        navigate('/passes');
      }
    }
  }, [passId, navigate, toast, passDataLoading, getPassById]);
  
  // Setup an interval to check for pass updates
  useEffect(() => {
    if (!passId) return;
    
    const interval = setInterval(() => {
      const updatedPass = getPassById(Number(passId));
      if (updatedPass) {
        setPass(updatedPass);
        
        // If not enough slots available for current visitor count
        if (updatedPass.availableSlots < visitors) {
          const newVisitorCount = Math.max(1, updatedPass.availableSlots);
          setVisitors(newVisitorCount);
          
          toast({
            title: "Availability changed",
            description: `Only ${updatedPass.availableSlots} slots available. We've adjusted your booking.`,
            variant: "destructive",
          });
        }
        
        // If the pass is now sold out
        if (updatedPass.availableSlots === 0) {
          toast({
            title: "Pass Sold Out",
            description: "This pass is no longer available. You will be redirected to the passes page.",
            variant: "destructive",
          });
          
          // Redirect after a short delay
          setTimeout(() => {
            navigate('/passes');
          }, 3000);
        }
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [passId, visitors, getPassById, toast, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormTouched(prev => ({ ...prev, [name]: true }));
    
    // Simple validation
    validateField(name, value);
  };
  
  // Update validation for priest name and token number
  const validateField = (name: string, value: string) => {
    const newErrors = { ...formErrors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors[name] = 'Name is required';
        } else if (value.trim().length < 3) {
          newErrors[name] = 'Name must be at least 3 characters';
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors[name] = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors[name] = 'Please enter a valid email';
        } else {
          delete newErrors[name];
        }
        break;
      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) {
          newErrors[name] = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          newErrors[name] = 'Please enter a valid 10-digit phone number';
        } else {
          delete newErrors[name];
        }
        break;
      case 'state':
        if (!value.trim()) {
          newErrors[name] = 'State is required';
        } else {
          delete newErrors[name];
        }
        break;
      case 'city':
        if (!value.trim()) {
          newErrors[name] = 'City is required';
        } else {
          delete newErrors[name];
        }
        break;
      case 'priestName':
        if (!value.trim()) {
          newErrors[name] = 'Priest name is required';
        } else if (value.trim().length < 3) {
          newErrors[name] = 'Priest name must be at least 3 characters';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'tokenNo':
        if (!value.trim()) {
          newErrors[name] = 'Token number is required';
        } else {
          delete newErrors[name];
        }
        break;
      case 'idNumber':
        if (!value.trim()) {
          newErrors[name] = 'ID number is required';
        } else if (value.trim().length < 6) {
          newErrors[name] = 'Please enter a valid ID number';
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMember = () => {
    setAdditionalMembers(prev => [...prev, {
      name: '',
      age: 0,
      sex: 'male',
      idProofType: 'aadhar',
      idProofNumber: ''
    }]);
  };

  const handleRemoveMember = (index: number) => {
    setAdditionalMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index: number, field: keyof AdditionalMemberInfo, value: any) => {
    setAdditionalMembers(prev => prev.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    }));
  };

  const validateMembers = () => {
    return additionalMembers.every(member => 
      member.name && 
      member.age > 0 && 
      member.age < 120 && 
      member.idProofNumber
    );
  };

  // Update form validation to include additional members
  const validateForm = () => {
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setFormTouched(allTouched);
    
    // Validate all fields
    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && 
          ['name', 'email', 'phone', 'state', 'city', 'idNumber', 'priestName', 'tokenNo'].includes(key) && 
          !validateField(key, value)) {
        isValid = false;
      }
    });

    if (visitors > 1 && !validateMembers()) {
      toast({
        title: "Additional Members Details Required",
        description: "Please fill in all required fields for additional members.",
        variant: "destructive",
      });
      return false;
    }

    return isValid;
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const handleVisitorChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      if (pass && visitors < pass.availableSlots) {
        setVisitors(prev => prev + 1);
        toast({
          title: "Visitor Added",
          description: `Booking for ${visitors + 1} visitors.`,
          duration: 2000,
        });
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
        toast({
          title: "Visitor Removed",
          description: `Now booking for ${visitors - 1} visitors.`,
          duration: 2000,
        });
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Form Incomplete",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if pass is still available
    const currentPass = getPassById(Number(passId));
    if (!currentPass || currentPass.availableSlots < visitors) {
      toast({
        title: "Availability changed",
        description: "The pass availability has changed. Please review your booking.",
        variant: "destructive",
      });
      return;
    }
    
    // Success feedback
    toast({
      title: "Booking Successful!",
      description: "Proceeding to payment page...",
      duration: 3000,
    });
    
    // Book the pass (reduce available slots)
    bookPass(Number(passId), visitors);
    
    // Generate a mock booking ID
    const bookingId = Math.floor(100000 + Math.random() * 900000);
    
    // Navigate to payment page with the booking ID
    setTimeout(() => {
      navigate(`/payment/${bookingId}`);
    }, 1500);
  };
  
  if (loading || passDataLoading) {
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
        
        {/* Real-time indicator */}
        <div className="flex items-center mb-4 text-sm text-muted-foreground">
          <div className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Real-time availability updates active</span>
        </div>
        
        {pass.availableSlots <= 5 && (
          <div className="mb-6 p-3 border border-amber-200 bg-amber-50 rounded-md flex items-center text-amber-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <div>
              <p className="font-medium">Limited availability!</p>
              <p className="text-sm">Only {pass.availableSlots} slots left for this pass</p>
            </div>
          </div>
        )}
        
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
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={formTouched.name && formErrors.name ? "border-red-500" : ""}
                    />
                    {formTouched.name && formErrors.name && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={formTouched.email && formErrors.email ? "border-red-500" : ""}
                      />
                      {formTouched.email && formErrors.email && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number*</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Enter your 10-digit phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={formTouched.phone && formErrors.phone ? "border-red-500" : ""}
                      />
                      {formTouched.phone && formErrors.phone && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State*</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="Enter your state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className={formTouched.state && formErrors.state ? "border-red-500" : ""}
                      />
                      {formTouched.state && formErrors.state && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.state}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City*</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={formTouched.city && formErrors.city ? "border-red-500" : ""}
                      />
                      {formTouched.city && formErrors.city && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.city}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priestName">Priest Name*</Label>
                      <Input
                        id="priestName"
                        name="priestName"
                        placeholder="Enter priest name"
                        value={formData.priestName}
                        onChange={handleInputChange}
                        required
                        className={formTouched.priestName && formErrors.priestName ? "border-red-500" : ""}
                      />
                      {formTouched.priestName && formErrors.priestName && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.priestName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tokenNo">Token Number*</Label>
                      <Input
                        id="tokenNo"
                        name="tokenNo"
                        placeholder="Enter token number"
                        value={formData.tokenNo}
                        onChange={handleInputChange}
                        required
                        className={formTouched.tokenNo && formErrors.tokenNo ? "border-red-500" : ""}
                      />
                      {formTouched.tokenNo && formErrors.tokenNo && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.tokenNo}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="idType">ID Type*</Label>
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
                      <Label htmlFor="idNumber">ID Number*</Label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        placeholder="Enter your ID number"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        required
                        className={formTouched.idNumber && formErrors.idNumber ? "border-red-500" : ""}
                      />
                      {formTouched.idNumber && formErrors.idNumber && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.idNumber}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm bg-green-50 border border-green-200 p-3 rounded-md flex items-start text-green-800">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      {visitors > 1 && (
                        <p className="mb-2">You are booking for {visitors} visitors. Only primary visitor details are required at this stage.</p>
                      )}
                      <p>ID proof will be required at the time of entry. Fields marked with * are required.</p>
                    </div>
                  </div>
                </CardContent>

      {/* Additional Members Section */}
      {visitors > 1 && (
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Additional Members</h3>
            <p className="text-sm text-muted-foreground">{additionalMembers.length} of {visitors - 1} added</p>
          </div>

          {additionalMembers.map((member, index) => (
            <Card key={index}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Member {index + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name*</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Age*</Label>
                    <Input
                      type="number"
                      value={member.age || ''}
                      onChange={(e) => handleMemberChange(index, 'age', parseInt(e.target.value) || 0)}
                      placeholder="Enter age"
                      required
                      min="1"
                      max="120"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gender*</Label>
                    <Select
                      value={member.sex}
                      onValueChange={(value) => handleMemberChange(index, 'sex', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>ID Proof Type*</Label>
                    <Select
                      value={member.idProofType}
                      onValueChange={(value) => handleMemberChange(index, 'idProofType', value)}
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
                </div>

                <div className="space-y-2">
                  <Label>ID Number*</Label>
                  <Input
                    value={member.idProofNumber}
                    onChange={(e) => handleMemberChange(index, 'idProofNumber', e.target.value)}
                    placeholder="Enter ID number"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {additionalMembers.length < (visitors - 1) && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAddMember}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          )}
        </div>
      )}

                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={pass.availableSlots === 0 || Object.keys(formErrors).length > 0}
                  >
                    {pass.availableSlots === 0 ? 'No Slots Available' : 'Continue to Payment'}
                  </Button>
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
