import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TaskExecutor } from './task-executor.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/command')
export class CommandController {
  constructor(private readonly taskExecutor: TaskExecutor) {}

  @Post('execute')
  @ApiOperation({ summary: 'Execute command (with undo support)' })
  execute(@Body() body: { commandType: string; id: string; data?: any }) {
    const result = this.taskExecutor.executeCommand(body.commandType, body.id, body.data);

    return {
      pattern: 'Command',
      description: 'Command encapsulates request with undo capability',
      ...result,
    };
  }

  @Post('undo')
  @ApiOperation({ summary: 'Undo last command' })
  undo() {
    const result = this.taskExecutor.undo();

    return {
      pattern: 'Command',
      description: 'Undid last command',
      ...result,
    };
  }
}
