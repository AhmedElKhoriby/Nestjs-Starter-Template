import {
  IPaymentProcessor,
  IRefundHandler,
  IWebhookValidator,
  IPaymentGatewayFactory,
  PaymentResult,
  RefundResult,
} from '../interfaces/payment-gateway.interface';

/**
 * SQUARE PAYMENT GATEWAY FAMILY
 * 
 * Concrete implementations for Square payment provider
 */

export class SquarePaymentProcessor implements IPaymentProcessor {
  async processPayment(
    amount: number,
    currency: string,
    cardToken: string,
  ): Promise<PaymentResult> {
    console.log(`⬛ Processing Square payment: ${amount} ${currency}`);

    await this.delay(180);

    return {
      success: true,
      transactionId: `sq_${Date.now()}`,
      amount,
      currency,
      provider: 'Square',
      timestamp: new Date(),
      metadata: {
        squareVersion: '2023-12-13',
        locationId: 'loc_123',
        cardNonce: cardToken,
      },
    };
  }

  getProviderName(): string {
    return 'Square';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export class SquareRefundHandler implements IRefundHandler {
  async processRefund(transactionId: string, amount: number): Promise<RefundResult> {
    console.log(`⏪ Processing Square refund for ${transactionId}: ${amount}`);

    await this.delay(180);

    return {
      success: true,
      refundId: `sq_refund_${Date.now()}`,
      transactionId,
      amount,
      provider: 'Square',
      timestamp: new Date(),
    };
  }

  getProviderName(): string {
    return 'Square';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export class SquareWebhookValidator implements IWebhookValidator {
  validateWebhook(signature: string, _payload: any): boolean {
    console.log(`🔐 Validating Square webhook signature: ${signature.substring(0, 20)}...`);

    // In production, this would verify using Square's webhook signature validation
    return signature.startsWith('square_sig_');
  }

  getProviderName(): string {
    return 'Square';
  }
}

/**
 * Square Factory - Creates Square-specific payment components
 */
export class SquarePaymentGatewayFactory implements IPaymentGatewayFactory {
  createPaymentProcessor(): IPaymentProcessor {
    return new SquarePaymentProcessor();
  }

  createRefundHandler(): IRefundHandler {
    return new SquareRefundHandler();
  }

  createWebhookValidator(): IWebhookValidator {
    return new SquareWebhookValidator();
  }

  getProviderName(): string {
    return 'Square';
  }
}
