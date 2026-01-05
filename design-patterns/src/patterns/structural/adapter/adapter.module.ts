import { Module } from '@nestjs/common';
import { LegacyPaymentAdapter } from './legacy-payment.adapter';
import { AdapterController } from './adapter.controller';

/**
 * ADAPTER PATTERN MODULE
 * 
 * Business Use Case: Legacy Payment System Integration
 * 
 * The Adapter pattern allows incompatible interfaces to work together.
 * It converts the interface of a class into another interface clients expect.
 * 
 * Use case: Integrating legacy payment systems with modern payment interface
 */
@Module({
  controllers: [AdapterController],
  providers: [LegacyPaymentAdapter],
})
export class AdapterModule {}
