import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatMediator } from './chat-mediator.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/mediator')
export class MediatorController {
  constructor(private readonly chatMediator: ChatMediator) {}

  @Get('demo')
  demo() {
    return {
      pattern: 'Mediator',
      ...this.chatMediator.demo(),
    };
  }
}
