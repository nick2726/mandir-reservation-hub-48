
export interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

// Import BookingDetails from confirmation types
import { BookingDetails } from '../confirmation/types';

// PaymentData extends BookingDetails
export type PaymentData = BookingDetails;

// This is the type that OrderSummary component expects
export interface MockBookingData {
  id: string;
  passType: string;
  date: Date;
  visitors: number;
  pricePerPerson: number;
  totalAmount: number;
  name?: string;
  email?: string;
  // Include properties from PaymentData that OrderSummary might use
  visitorInfo?: {
    name: string;
    email: string;
  };
}
