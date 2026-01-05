import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StockMarketService } from './stock-market.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/observer')
export class ObserverController {
  constructor(private readonly stockMarket: StockMarketService) {}

  @Post('update-price')
  @ApiOperation({ summary: 'Update stock price (observers get notified)' })
  updatePrice(@Body() body: { stock: string; price: number }) {
    const setup = this.stockMarket.setupDemo(body.stock);
    this.stockMarket.updatePrice(body.stock, body.price);

    return {
      pattern: 'Observer',
      description: 'Multiple observers notified of stock price change',
      ...setup,
      result: `${body.stock} updated to $${body.price}`,
    };
  }
}
