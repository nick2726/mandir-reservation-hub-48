
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pass } from '@/hooks/usePassData';

interface VisitorFormProps {
  pass: Pass;
  visitors: number;
  formData: {
    name: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    priestName: string;
    tokenNo: string;
    idType: string;
    idNumber: string;
  };
  formErrors: Record<string, string>;
  formTouched: Record<string, boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const VisitorForm: React.FC<VisitorFormProps> = ({
  pass,
  visitors,
  formData,
  formErrors,
  formTouched,
  handleInputChange,
  handleSelectChange,
  handleSubmit
}) => {
  return (
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
              <Label htmlFor="priestName">Priest Name (Optional)</Label>
              <Input
                id="priestName"
                name="priestName"
                placeholder="Name of your priest (if any)"
                value={formData.priestName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tokenNo">Token Number (Optional)</Label>
              <Input
                id="tokenNo"
                name="tokenNo"
                placeholder="Enter token number if available"
                value={formData.tokenNo}
                onChange={handleInputChange}
              />
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
  );
};

export default VisitorForm;
