/**
 * Common Interfaces
 * 
 * Shared interfaces used across multiple pattern implementations
 */

export interface IResult<T = any> {
  success: boolean;
  data?: T;
  message: string;
  timestamp: Date;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface IOrder {
  id: string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: string;
  createdAt: Date;
}

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface IPayment {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: string;
  processedAt?: Date;
}

export interface INotification {
  id: string;
  type: string;
  recipient: string;
  message: string;
  sentAt: Date;
}
