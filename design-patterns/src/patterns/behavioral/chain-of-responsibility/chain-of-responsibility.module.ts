import { Module } from '@nestjs/common';
import { LoanApprovalService } from './loan-approval.service';
import { ChainOfResponsibilityController } from './chain-of-responsibility.controller';

@Module({
  controllers: [ChainOfResponsibilityController],
  providers: [LoanApprovalService],
})
export class ChainOfResponsibilityModule {}
