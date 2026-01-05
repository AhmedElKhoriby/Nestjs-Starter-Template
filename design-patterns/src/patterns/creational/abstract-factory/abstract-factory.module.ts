import { Module } from '@nestjs/common';
import { PaymentGatewayFactory } from './payment-gateway.factory';
import { AbstractFactoryController } from './abstract-factory.controller';

/**
 * ABSTRACT FACTORY PATTERN MODULE
 * 
 * Business Use Case: Payment Gateway Integration
 * 
 * The Abstract Factory pattern provides an interface for creating families
 * of related objects without specifying their concrete classes.
 * 
 * Use case: Supporting multiple payment providers (Stripe, PayPal, Square)
 * where each provider has its own payment processor, refund handler, and webhook validator.
 */
@Module({
  controllers: [AbstractFactoryController],
  providers: [PaymentGatewayFactory],
})
export class AbstractFactoryModule {}
