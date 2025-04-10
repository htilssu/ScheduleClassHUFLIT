export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  duration: number; // days
  features: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  subscribers: number;
}

export interface Subscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  packageId: string;
  packageName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired';
  paymentMethod: string;
  paymentStatus: 'paid' | 'unpaid';
}

export interface PaymentHistoryItem {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  packageId: string;
  packageName: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  date: string;
}

export interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export interface NewPackageForm {
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  duration: number;
  features: string[];
  status: 'active' | 'inactive';
} 