/**
 * Modern Payment Interface (Target Interface)
 * This is the interface our application expects
 */
export interface IModernPayment {
  processPayment(request: PaymentRequest): Promise<PaymentResponse>;
  refund(transactionId: string, amount: number): Promise<RefundResponse>;
  getStatus(transactionId: string): Promise<PaymentStatus>;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  customerEmail: string;
  paymentMethod: {
    type: 'card' | 'bank' | 'wallet';
    token: string;
  };
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status: string;
}

export interface RefundResponse {
  success: boolean;
  refundId: string;
  transactionId: string;
  amount: number;
  timestamp: Date;
}

export interface PaymentStatus {
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Legacy Payment Interface (Adaptee Interface)
 * This is the old system with incompatible interface
 */
export interface ILegacyPaymentSystem {
  // Old method signatures with different parameter structure
  charge(cardNumber: string, cvv: string, amountCents: number): string;
  voidTransaction(referenceNumber: string): boolean;
  checkTransactionStatus(referenceNumber: string): string;
}
