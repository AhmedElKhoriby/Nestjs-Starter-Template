import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportVisitorService } from './report-visitor.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/visitor')
export class VisitorController {
  constructor(private readonly visitorService: ReportVisitorService) {}

  @Post('calculate')
  calculate(@Body() body: { visitorType: string }) {
    return {
      pattern: 'Visitor',
      description: 'Visitor performed operation on different object types',
      ...this.visitorService.calculate(body.visitorType),
    };
  }
}
