import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { BridgeController } from './bridge.controller';

@Module({
  controllers: [BridgeController],
  providers: [MessageService],
})
export class BridgeModule {}
