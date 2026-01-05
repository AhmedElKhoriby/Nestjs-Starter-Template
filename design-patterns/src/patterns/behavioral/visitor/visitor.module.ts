import { Module } from '@nestjs/common';
import { ReportVisitorService } from './report-visitor.service';
import { VisitorController } from './visitor.controller';

@Module({
  controllers: [VisitorController],
  providers: [ReportVisitorService],
})
export class VisitorModule {}
