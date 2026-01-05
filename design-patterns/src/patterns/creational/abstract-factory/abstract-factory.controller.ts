import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentGatewayFactory } from './payment-gateway.factory';
import { PaymentProvider } from './interfaces/payment-gateway.interface';

/**
 * Abstract Factory Pattern Controller
 * 
 * Demonstrates the Abstract Factory pattern through payment gateway integration
 */
@ApiTags('Creational Patterns')
@Controller('patterns/abstract-factory')
export class AbstractFactoryController {
  constructor(private readonly gatewayFactory: PaymentGatewayFactory) {}

  @Get('providers')
  @ApiOperation({ summary: 'Get supported payment providers' })
  getSupportedProviders() {
    return {
      pattern: 'Abstract Factory',
      description: 'Each provider has its own factory creating a family of related components',
      providers: this.gatewayFactory.getSupportedProviders(),
    };
  }

  @Post('process-payment')
  @ApiOperation({ summary: 'Process payment using abstract factory' })
  async processPayment(
    @Body()
    body: {
      provider: PaymentProvider;
      amount: number;
      currency: string;
      cardToken: string;
    },
  ) {
    // Abstract Factory creates the provider-specific factory
    const factory = this.gatewayFactory.createFactory(body.provider);

    // Factory creates all related components for this provider
    const processor = factory.createPaymentProcessor();
    const webhookValidator = factory.createWebhookValidator();

    // Use the created components
    const paymentResult = await processor.processPayment(
      body.amount,
      body.currency,
      body.cardToken,
    );

    return {
      pattern: 'Abstract Factory',
      description: 'Factory created a complete family of payment components',
      factoryUsed: factory.getProviderName(),
      componentsCreated: {
        processor: processor.getProviderName(),
        webhookValidator: webhookValidator.getProviderName(),
      },
      result: paymentResult,
    };
  }

  @Post('process-refund')
  @ApiOperation({ summary: 'Process refund using abstract factory' })
  async processRefund(
    @Body()
    body: {
      provider: PaymentProvider;
      transactionId: string;
      amount: number;
    },
  ) {
    const factory = this.gatewayFactory.createFactory(body.provider);
    const refundHandler = factory.createRefundHandler();

    const refundResult = await refundHandler.processRefund(body.transactionId, body.amount);

    return {
      pattern: 'Abstract Factory',
      description: 'Factory ensured refund handler matches the payment provider',
      factoryUsed: factory.getProviderName(),
      result: refundResult,
    };
  }

  @Post('validate-webhook')
  @ApiOperation({ summary: 'Validate webhook signature' })
  validateWebhook(
    @Body()
    body: {
      provider: PaymentProvider;
      signature: string;
      payload: any;
    },
  ) {
    const factory = this.gatewayFactory.createFactory(body.provider);
    const validator = factory.createWebhookValidator();

    const isValid = validator.validateWebhook(body.signature, body.payload);

    return {
      pattern: 'Abstract Factory',
      description: 'Factory provided provider-specific webhook validator',
      provider: factory.getProviderName(),
      isValid,
    };
  }

  @Get('smart-select')
  @ApiOperation({ summary: 'Automatically select best payment provider' })
  smartSelectProvider(
    @Query('country') country?: string,
    @Query('transactionSize') transactionSize?: 'small' | 'medium' | 'large',
  ) {
    const selectedProvider = this.gatewayFactory.selectBestProvider({
      country,
      transactionSize,
    });

    const factory = this.gatewayFactory.createFactory(selectedProvider);

    return {
      pattern: 'Abstract Factory',
      description: 'Intelligently selected the best payment provider based on criteria',
      criteria: { country, transactionSize },
      selectedProvider,
      factoryCreated: factory.getProviderName(),
    };
  }
}
