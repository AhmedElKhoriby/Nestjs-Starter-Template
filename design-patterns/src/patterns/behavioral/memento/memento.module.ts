import { Module } from '@nestjs/common';
import { TextEditorService } from './text-editor.service';
import { MementoController } from './memento.controller';

@Module({
  controllers: [MementoController],
  providers: [TextEditorService],
})
export class MementoModule {}
