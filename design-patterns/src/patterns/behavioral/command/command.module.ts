import { Module } from '@nestjs/common';
import { TaskExecutor } from './task-executor.service';
import { CommandController } from './command.controller';

@Module({
  controllers: [CommandController],
  providers: [TaskExecutor],
})
export class CommandModule {}
