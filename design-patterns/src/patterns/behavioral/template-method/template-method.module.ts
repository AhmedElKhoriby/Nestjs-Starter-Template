import { Module } from '@nestjs/common';
import { DataProcessorService } from './data-processor.service';
import { TemplateMethodController } from './template-method.controller';

@Module({
  controllers: [TemplateMethodController],
  providers: [DataProcessorService],
})
export class TemplateMethodModule {}
