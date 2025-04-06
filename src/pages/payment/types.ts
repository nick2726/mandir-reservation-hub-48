
export interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface MockBookingData {
  id: string;
  passType: string;
  date: Date;
  visitors: number;
  pricePerPerson: number;
  totalAmount: number;
  name: string;
  email: string;
}

// Add PaymentData type that extends from BookingDetails in confirmation types
import { BookingDetails } from '../confirmation/types';

export type PaymentData = BookingDetails;
