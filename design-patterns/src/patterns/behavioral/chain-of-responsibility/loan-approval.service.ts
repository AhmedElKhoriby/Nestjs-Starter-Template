import { Injectable } from '@nestjs/common';

interface LoanRequest {
  amount: number;
  creditScore: number;
  income: number;
  employmentYears: number;
}

abstract class LoanHandler {
  protected next: LoanHandler | null = null;

  setNext(handler: LoanHandler): LoanHandler {
    this.next = handler;
    return handler;
  }

  abstract handle(request: LoanRequest): { approved: boolean; handler: string; reason: string };
}

class CreditScoreHandler extends LoanHandler {
  handle(request: LoanRequest) {
    if (request.creditScore < 600) {
      return {
        approved: false,
        handler: 'CreditScoreHandler',
        reason: 'Credit score too low (minimum 600)',
      };
    }

    console.log('✅ [CreditScoreHandler] Passed - forwarding to next');
    return this.next ? this.next.handle(request) : { approved: true, handler: 'CreditScoreHandler', reason: 'All checks passed' };
  }
}

class IncomeHandler extends LoanHandler {
  handle(request: LoanRequest) {
    const requiredIncome = request.amount * 0.3;
    if (request.income < requiredIncome) {
      return {
        approved: false,
        handler: 'IncomeHandler',
        reason: `Insufficient income (required: $${requiredIncome})`,
      };
    }

    console.log('✅ [IncomeHandler] Passed - forwarding to next');
    return this.next ? this.next.handle(request) : { approved: true, handler: 'IncomeHandler', reason: 'All checks passed' };
  }
}

class EmploymentHandler extends LoanHandler {
  handle(request: LoanRequest) {
    if (request.employmentYears < 2) {
      return {
        approved: false,
        handler: 'EmploymentHandler',
        reason: 'Insufficient employment history (minimum 2 years)',
      };
    }

    console.log('✅ [EmploymentHandler] Passed - All checks complete');
    return { approved: true, handler: 'EmploymentHandler', reason: 'All checks passed' };
  }
}

@Injectable()
export class LoanApprovalService {
  processLoan(request: LoanRequest) {
    const creditCheck = new CreditScoreHandler();
    const incomeCheck = new IncomeHandler();
    const employmentCheck = new EmploymentHandler();

    creditCheck.setNext(incomeCheck).setNext(employmentCheck);

    return creditCheck.handle(request);
  }
}
