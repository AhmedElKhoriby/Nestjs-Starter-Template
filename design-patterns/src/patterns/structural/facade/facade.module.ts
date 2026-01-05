import { Module } from '@nestjs/common';
import { OrderFacade } from './order.facade';
import { FacadeController } from './facade.controller';

/**
 * FACADE PATTERN MODULE
 * 
 * Business Use Case: Simplified Order Processing
 * 
 * The Facade pattern provides a simplified interface to a complex subsystem.
 * 
 * Use case: Order processing involves inventory, payment, shipping, and notification
 * subsystems. Facade provides a simple interface to orchestrate all of them.
 */
@Module({
  controllers: [FacadeController],
  providers: [OrderFacade],
})
export class FacadeModule {}
