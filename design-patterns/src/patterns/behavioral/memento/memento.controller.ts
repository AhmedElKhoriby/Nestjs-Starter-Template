import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TextEditorService } from './text-editor.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/memento')
export class MementoController {
  constructor(private readonly editor: TextEditorService) {}

  @Post('write')
  write(@Body() body: { text: string }) {
    return {
      pattern: 'Memento',
      description: 'Saved state before modification',
      ...this.editor.write(body.text),
    };
  }

  @Post('undo')
  undo() {
    return {
      pattern: 'Memento',
      description: 'Restored previous state',
      ...this.editor.undo(),
    };
  }

  @Get('content')
  getContent() {
    return {
      pattern: 'Memento',
      ...this.editor.getContent(),
    };
  }
}
