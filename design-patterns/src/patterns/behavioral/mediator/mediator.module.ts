import { Module } from '@nestjs/common';
import { ChatMediator } from './chat-mediator.service';
import { MediatorController } from './mediator.controller';

@Module({
  controllers: [MediatorController],
  providers: [ChatMediator],
})
export class MediatorModule {}
