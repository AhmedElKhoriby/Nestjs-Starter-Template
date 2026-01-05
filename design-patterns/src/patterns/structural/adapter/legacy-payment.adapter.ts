import { Injectable } from '@nestjs/common';
import {
  IModernPayment,
  PaymentRequest,
  PaymentResponse,
  RefundResponse,
  PaymentStatus,
} from './interfaces/payment.interface';
import { LegacyPaymentSystem } from './services/legacy-payment.service';

/**
 * Legacy Payment Adapter - Adapter Pattern Implementation
 * 
 * PROBLEM: We have a legacy payment system with an incompatible interface,
 * but our modern application expects a different interface. We cannot modify
 * the legacy system, but need to integrate it.
 * 
 * SOLUTION: Adapter pattern wraps the legacy system and translates calls
 * from the modern interface to the legacy interface.
 * 
 * REAL-WORLD USE CASE:
 * - Integrating legacy systems
 * - Third-party API integration with different interfaces
 * - Database migration with different ORMs
 * - Supporting multiple versions of an API
 */
@Injectable()
export class LegacyPaymentAdapter implements IModernPayment {
  private legacySystem: LegacyPaymentSystem;

  constructor() {
    // Initialize the legacy system (Adaptee)
    this.legacySystem = new LegacyPaymentSystem();
  }

  /**
   * Adapter method: processPayment
   * 
   * Translates modern payment request to legacy charge method
   */
  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log('🔄 [Adapter] Translating modern payment request to legacy format...');

    try {
      // Extract card token (in real scenario, this would be decrypted)
      const cardNumber = this.extractCardNumber(request.paymentMethod.token);
      const cvv = '000'; // Would be part of token in real scenario

      // Convert dollars to cents (legacy system uses cents)
      const amountCents = Math.round(request.amount * 100);

      // Call legacy system with adapted parameters
      const referenceNumber = this.legacySystem.charge(cardNumber, cvv, amountCents);

      console.log('✅ [Adapter] Successfully adapted and processed payment');

      // Translate legacy response to modern format
      return {
        success: true,
        transactionId: referenceNumber,
        amount: request.amount,
        currency: request.currency,
        timestamp: new Date(),
        status: 'completed',
      };
    } catch (error) {
      console.error('❌ [Adapter] Payment processing failed:', error);

      return {
        success: false,
        transactionId: '',
        amount: request.amount,
        currency: request.currency,
        timestamp: new Date(),
        status: 'failed',
      };
    }
  }

  /**
   * Adapter method: refund
   * 
   * Translates modern refund request to legacy void method
   */
  async refund(transactionId: string, amount: number): Promise<RefundResponse> {
    console.log(`🔄 [Adapter] Translating modern refund request to legacy void...`);

    // Legacy system doesn't support partial refunds, only full voids
    const success = this.legacySystem.voidTransaction(transactionId);

    if (success) {
      console.log('✅ [Adapter] Successfully adapted and processed refund');
    }

    return {
      success,
      refundId: success ? `REFUND-${Date.now()}` : '',
      transactionId,
      amount,
      timestamp: new Date(),
    };
  }

  /**
   * Adapter method: getStatus
   * 
   * Translates legacy status codes to modern status format
   */
  async getStatus(transactionId: string): Promise<PaymentStatus> {
    console.log(`🔄 [Adapter] Translating legacy status to modern format...`);

    const legacyStatus = this.legacySystem.checkTransactionStatus(transactionId);
    const transaction = this.legacySystem.getTransaction(transactionId);

    // Map legacy status codes to modern status
    const modernStatus = this.mapLegacyStatus(legacyStatus);

    return {
      transactionId,
      status: modernStatus,
      amount: transaction ? transaction.amountCents / 100 : 0,
      createdAt: transaction ? new Date(transaction.timestamp) : new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Helper: Extract card number from token
   * In production, this would decrypt the token
   */
  private extractCardNumber(_token: string): string {
    // Simulated card number extraction
    return '4532123456789012';
  }

  /**
   * Helper: Map legacy status to modern status
   */
  private mapLegacyStatus(
    legacyStatus: string,
  ): 'pending' | 'completed' | 'failed' | 'refunded' {
    const statusMap: Record<string, 'pending' | 'completed' | 'failed' | 'refunded'> = {
      APPROVED: 'completed',
      PENDING: 'pending',
      DECLINED: 'failed',
      VOIDED: 'refunded',
      NOT_FOUND: 'failed',
    };

    return statusMap[legacyStatus] || 'failed';
  }

  /**
   * Get adapter information
   */
  getAdapterInfo() {
    return {
      adapterType: 'LegacyPaymentAdapter',
      adaptee: 'LegacyPaymentSystem',
      target: 'IModernPayment',
      purpose: 'Adapts legacy payment system to modern interface',
    };
  }
}
