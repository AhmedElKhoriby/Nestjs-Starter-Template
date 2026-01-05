import { Module } from '@nestjs/common';
import { StockMarketService } from './stock-market.service';
import { ObserverController } from './observer.controller';

@Module({
  controllers: [ObserverController],
  providers: [StockMarketService],
})
export class ObserverModule {}
