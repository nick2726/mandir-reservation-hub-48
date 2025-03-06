
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  priestName: string;
  tokenNo: string;
  idType: string;
  idNumber: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  state: '',
  city: '',
  priestName: '',
  tokenNo: '',
  idType: 'aadhar',
  idNumber: '',
};

export const useBookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormTouched(prev => ({ ...prev, [name]: true }));
    
    // Simple validation
    validateField(name, value);
  };
  
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
        // Optional field, no validation required
        delete newErrors[name];
        break;
      case 'tokenNo':
        // Optional field, no validation required
        delete newErrors[name];
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
          ['name', 'email', 'phone', 'state', 'city', 'idNumber'].includes(key) && 
          !validateField(key, value)) {
        isValid = false;
      }
    });
    
    return isValid;
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormTouched(prev => ({ ...prev, [name]: true }));
  };

  return {
    formData,
    formErrors,
    formTouched,
    handleInputChange,
    handleSelectChange,
    validateForm
  };
};
