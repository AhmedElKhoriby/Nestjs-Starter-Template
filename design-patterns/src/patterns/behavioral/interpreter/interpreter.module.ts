import { Module } from '@nestjs/common';
import { QueryInterpreter } from './query-interpreter.service';
import { InterpreterController } from './interpreter.controller';

@Module({
  controllers: [InterpreterController],
  providers: [QueryInterpreter],
})
export class InterpreterModule {}
