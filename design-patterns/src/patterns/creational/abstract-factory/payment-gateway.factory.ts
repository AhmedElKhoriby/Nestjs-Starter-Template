import { Injectable, BadRequestException } from '@nestjs/common';
import { IPaymentGatewayFactory, PaymentProvider } from './interfaces/payment-gateway.interface';
import { StripePaymentGatewayFactory } from './factories/stripe.factory';
import { PayPalPaymentGatewayFactory } from './factories/paypal.factory';
import { SquarePaymentGatewayFactory } from './factories/square.factory';

/**
 * Payment Gateway Factory - Abstract Factory Pattern Implementation
 * 
 * PROBLEM: We need to support multiple payment providers, each with their own
 * set of components (processor, refund handler, webhook validator). We want to
 * ensure that components from different providers don't get mixed up.
 * 
 * SOLUTION: Abstract Factory pattern ensures that we create families of related
 * objects (payment components) that work together.
 * 
 * REAL-WORLD USE CASE:
 * - Multi-provider payment systems
 * - Geographic-specific payment providers
 * - A/B testing different payment gateways
 * - Automatic failover between providers
 */
@Injectable()
export class PaymentGatewayFactory {
  /**
   * Creates the appropriate payment gateway factory based on provider
   * This is the "Factory of Factories"
   */
  createFactory(provider: PaymentProvider | string): IPaymentGatewayFactory {
    const normalizedProvider = provider.toLowerCase();

    switch (normalizedProvider) {
      case PaymentProvider.STRIPE:
        return new StripePaymentGatewayFactory();

      case PaymentProvider.PAYPAL:
        return new PayPalPaymentGatewayFactory();

      case PaymentProvider.SQUARE:
        return new SquarePaymentGatewayFactory();

      default:
        throw new BadRequestException(
          `Unknown payment provider: ${provider}. Supported: stripe, paypal, square`,
        );
    }
  }

  /**
   * Get all supported payment providers
   */
  getSupportedProviders(): string[] {
    return Object.values(PaymentProvider);
  }

  /**
   * Automatically select best provider based on criteria
   */
  selectBestProvider(criteria: {
    country?: string;
    transactionSize?: 'small' | 'medium' | 'large';
  }): PaymentProvider {
    // Example business logic for provider selection
    if (criteria.country === 'US' && criteria.transactionSize === 'small') {
      return PaymentProvider.SQUARE; // Lower fees for small US transactions
    }

    if (criteria.country === 'EU') {
      return PaymentProvider.STRIPE; // Best EU support
    }

    return PaymentProvider.PAYPAL; // Default fallback
  }
}
