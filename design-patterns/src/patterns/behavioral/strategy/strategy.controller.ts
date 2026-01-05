import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShippingService } from './shipping.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/strategy')
export class StrategyController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('calculate')
  calculate(@Body() body: { strategy: string; weight: number; distance: number }) {
    return {
      pattern: 'Strategy',
      description: 'Different algorithm selected at runtime',
      ...this.shippingService.calculateShipping(body.strategy, body.weight, body.distance),
    };
  }
}
