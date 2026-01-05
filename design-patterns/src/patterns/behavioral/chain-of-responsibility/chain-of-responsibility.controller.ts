import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoanApprovalService } from './loan-approval.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/chain-of-responsibility')
export class ChainOfResponsibilityController {
  constructor(private readonly loanService: LoanApprovalService) {}

  @Post('approve-loan')
  @ApiOperation({ summary: 'Process loan through chain of handlers' })
  approveLoan(
    @Body() body: { amount: number; creditScore: number; income: number; employmentYears: number },
  ) {
    const result = this.loanService.processLoan(body);

    return {
      pattern: 'Chain of Responsibility',
      description: 'Request passed through multiple handlers in sequence',
      chain: ['CreditScoreHandler', 'IncomeHandler', 'EmploymentHandler'],
      result,
    };
  }
}
