import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MessageService } from './message.service';

@ApiTags('Structural Patterns')
@Controller('patterns/bridge')
export class BridgeController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send-message')
  @ApiOperation({ summary: 'Send message using bridge pattern' })
  async sendMessage(
    @Body() body: {
      type: 'text' | 'encrypted';
      channel: 'email' | 'sms';
      content: string;
      recipient: string;
    },
  ) {
    const result = await this.messageService.sendMessage(
      body.type,
      body.channel,
      body.content,
      body.recipient,
    );

    return {
      pattern: 'Bridge',
      description: 'Separated message abstraction from sender implementation',
      messageType: body.type,
      senderChannel: body.channel,
      result,
    };
  }
}
