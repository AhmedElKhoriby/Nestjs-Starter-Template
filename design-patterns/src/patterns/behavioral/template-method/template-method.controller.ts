import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataProcessorService } from './data-processor.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/template-method')
export class TemplateMethodController {
  constructor(private readonly processorService: DataProcessorService) {}

  @Post('process')
  process(@Body() body: { format: string; data: any[] }) {
    return {
      pattern: 'Template Method',
      description: 'Algorithm structure defined, steps implemented differently',
      result: this.processorService.processData(body.format, body.data),
    };
  }
}
