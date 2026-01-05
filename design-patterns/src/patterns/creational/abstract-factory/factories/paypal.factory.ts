import {
  IPaymentProcessor,
  IRefundHandler,
  IWebhookValidator,
  IPaymentGatewayFactory,
  PaymentResult,
  RefundResult,
} from '../interfaces/payment-gateway.interface';

/**
 * PAYPAL PAYMENT GATEWAY FAMILY
 * 
 * Concrete implementations for PayPal payment provider
 */

export class PayPalPaymentProcessor implements IPaymentProcessor {
  async processPayment(
    amount: number,
    currency: string,
    cardToken: string,
  ): Promise<PaymentResult> {
    console.log(`💰 Processing PayPal payment: ${amount} ${currency}`);

    await this.delay(250);

    return {
      success: true,
      transactionId: `PAYPAL-${Date.now()}`,
      amount,
      currency,
      provider: 'PayPal',
      timestamp: new Date(),
      metadata: {
        paypalVersion: 'v2',
        paymentType: 'instant',
        token: cardToken,
      },
    };
  }

  getProviderName(): string {
    return 'PayPal';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export class PayPalRefundHandler implements IRefundHandler {
  async processRefund(transactionId: string, amount: number): Promise<RefundResult> {
    console.log(`🔄 Processing PayPal refund for ${transactionId}: ${amount}`);

    await this.delay(250);

    return {
      success: true,
      refundId: `PAYPAL-REFUND-${Date.now()}`,
      transactionId,
      amount,
      provider: 'PayPal',
      timestamp: new Date(),
    };
  }

  getProviderName(): string {
    return 'PayPal';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export class PayPalWebhookValidator implements IWebhookValidator {
  validateWebhook(signature: string, _payload: any): boolean {
    console.log(`🔒 Validating PayPal webhook signature: ${signature.substring(0, 20)}...`);

    // In production, this would verify using PayPal's webhook verification
    return signature.startsWith('paypal_sig_');
  }

  getProviderName(): string {
    return 'PayPal';
  }
}

/**
 * PayPal Factory - Creates PayPal-specific payment components
 */
export class PayPalPaymentGatewayFactory implements IPaymentGatewayFactory {
  createPaymentProcessor(): IPaymentProcessor {
    return new PayPalPaymentProcessor();
  }

  createRefundHandler(): IRefundHandler {
    return new PayPalRefundHandler();
  }

  createWebhookValidator(): IWebhookValidator {
    return new PayPalWebhookValidator();
  }

  getProviderName(): string {
    return 'PayPal';
  }
}
