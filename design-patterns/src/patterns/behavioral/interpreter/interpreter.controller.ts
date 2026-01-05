import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryInterpreter } from './query-interpreter.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/interpreter')
export class InterpreterController {
  constructor(private readonly interpreter: QueryInterpreter) {}

  @Post('query')
  query(@Body() body: { query: string }) {
    return {
      pattern: 'Interpreter',
      description: 'Interpreted and executed custom query language',
      ...this.interpreter.interpret(body.query),
    };
  }
}
