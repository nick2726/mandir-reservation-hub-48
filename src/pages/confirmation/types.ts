
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

export interface BookingDetails {
  id: string;
  passType: string;
  date: Date;
  visitors: number;
  pricePerPerson: number;
  totalAmount: number;
  visitorInfo: VisitorInfo;
  bookingTime: Date;
}
