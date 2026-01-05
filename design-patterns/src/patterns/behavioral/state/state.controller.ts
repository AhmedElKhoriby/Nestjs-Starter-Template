import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderStateService } from './order-state.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/state')
export class StateController {
  constructor(private readonly orderState: OrderStateService) {}

  @Post('create')
  create(@Body() body: { orderId: string }) {
    return {
      pattern: 'State',
      description: 'Created order in initial state',
      ...this.orderState.createOrder(body.orderId),
    };
  }

  @Post('process')
  process(@Body() body: { orderId: string }) {
    return {
      pattern: 'State',
      description: 'State changed based on action',
      ...this.orderState.processOrder(body.orderId),
    };
  }

  @Post('cancel')
  cancel(@Body() body: { orderId: string }) {
    return {
      pattern: 'State',
      description: 'Attempted to cancel order',
      ...this.orderState.cancelOrder(body.orderId),
    };
  }
}
