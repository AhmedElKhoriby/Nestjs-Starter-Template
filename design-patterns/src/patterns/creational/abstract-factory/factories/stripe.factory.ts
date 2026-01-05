import {
  IPaymentProcessor,
  IRefundHandler,
  IWebhookValidator,
  IPaymentGatewayFactory,
  PaymentResult,
  RefundResult,
} from '../interfaces/payment-gateway.interface';

/**
 * STRIPE PAYMENT GATEWAY FAMILY
 * 
 * Concrete implementations for Stripe payment provider
 */

export class StripePaymentProcessor implements IPaymentProcessor {
  async processPayment(
    amount: number,
    currency: string,
    cardToken: string,
  ): Promise<PaymentResult> {
    console.log(`💳 Processing Stripe payment: ${amount} ${currency}`);

    // Simulate Stripe API call
    await this.delay(200);

    return {
      success: true,
      transactionId: `stripe_${Date.now()}`,
      amount,
      currency,
      provider: 'Stripe',
      timestamp: new Date(),
      metadata: {
        stripeVersion: '2023-10-16',
        paymentMethod: 'card',
        cardToken,
      },
    };
  }

  getProviderName(): string {
    return 'Stripe';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export class StripeRefundHandler implements IRefundHandler {
  async processRefund(transactionId: string, amount: number): Promise<RefundResult> {
    console.log(`↩️ Processing Stripe refund for ${transactionId}: ${amount}`);

    await this.delay(200);

    return {
      success: true,
      refundId: `stripe_refund_${Date.now()}`,
      transactionId,
      amount,
      provider: 'Stripe',
      timestamp: new Date(),
    };
  }

  getProviderName(): string {
    return 'Stripe';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export class StripeWebhookValidator implements IWebhookValidator {
  validateWebhook(signature: string, _payload: any): boolean {
    console.log(`🔐 Validating Stripe webhook signature: ${signature.substring(0, 20)}...`);

    // In production, this would verify using Stripe's webhook secret
    return signature.startsWith('stripe_sig_');
  }

  getProviderName(): string {
    return 'Stripe';
  }
}

/**
 * Stripe Factory - Creates Stripe-specific payment components
 */
export class StripePaymentGatewayFactory implements IPaymentGatewayFactory {
  createPaymentProcessor(): IPaymentProcessor {
    return new StripePaymentProcessor();
  }

  createRefundHandler(): IRefundHandler {
    return new StripeRefundHandler();
  }

  createWebhookValidator(): IWebhookValidator {
    return new StripeWebhookValidator();
  }

  getProviderName(): string {
    return 'Stripe';
  }
}
