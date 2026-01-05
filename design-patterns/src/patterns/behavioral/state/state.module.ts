import { Module } from '@nestjs/common';
import { OrderStateService } from './order-state.service';
import { StateController } from './state.controller';

@Module({
  controllers: [StateController],
  providers: [OrderStateService],
})
export class StateModule {}
