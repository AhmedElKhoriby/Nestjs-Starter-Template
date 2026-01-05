import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { StrategyController } from './strategy.controller';

@Module({
  controllers: [StrategyController],
  providers: [ShippingService],
})
export class StrategyModule {}
