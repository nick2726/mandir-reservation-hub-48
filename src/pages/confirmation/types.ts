
export interface VisitorInfo {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  priestName: string;
  tokenNo: string;
  idProofType: string;
  idProofNumber: string;
}

export interface AdditionalMemberInfo {
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  idProofType: string;
  idProofNumber: string;
}

export interface BookingDetails {
  id: string;
  passType: string;
  date: Date;
  visitors: number;
  pricePerPerson: number;
  totalAmount: number;
  visitorInfo: VisitorInfo;
  additionalMembers?: AdditionalMemberInfo[];
  bookingTime: Date;
  paymentMethod?: string; // Added paymentMethod field
}
