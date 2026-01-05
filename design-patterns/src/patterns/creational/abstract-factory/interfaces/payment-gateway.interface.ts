/**
 * Abstract Factory Pattern Interfaces
 * 
 * Define the family of related payment gateway components
 */

// Product interfaces
export interface IPaymentProcessor {
  processPayment(amount: number, currency: string, cardToken: string): Promise<PaymentResult>;
  getProviderName(): string;
}

export interface IRefundHandler {
  processRefund(transactionId: string, amount: number): Promise<RefundResult>;
  getProviderName(): string;
}

export interface IWebhookValidator {
  validateWebhook(signature: string, payload: any): boolean;
  getProviderName(): string;
}

// Abstract Factory interface
export interface IPaymentGatewayFactory {
  createPaymentProcessor(): IPaymentProcessor;
  createRefundHandler(): IRefundHandler;
  createWebhookValidator(): IWebhookValidator;
  getProviderName(): string;
}

// Result types
export interface PaymentResult {
  success: boolean;
  transactionId: string;
  amount: number;
  currency: string;
  provider: string;
  timestamp: Date;
  metadata?: any;
}

export interface RefundResult {
  success: boolean;
  refundId: string;
  transactionId: string;
  amount: number;
  provider: string;
  timestamp: Date;
}

export enum PaymentProvider {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  SQUARE = 'square',
}
