import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LegacyPaymentAdapter } from './legacy-payment.adapter';
import { PaymentRequest } from './interfaces/payment.interface';

/**
 * Adapter Pattern Controller
 * 
 * Demonstrates the Adapter pattern through legacy payment system integration
 */
@ApiTags('Structural Patterns')
@Controller('patterns/adapter')
export class AdapterController {
  constructor(private readonly paymentAdapter: LegacyPaymentAdapter) {}

  @Get('info')
  @ApiOperation({ summary: 'Get adapter information' })
  getAdapterInfo() {
    return {
      pattern: 'Adapter',
      description:
        'Adapter translates between modern interface and legacy system',
      ...this.paymentAdapter.getAdapterInfo(),
    };
  }

  @Post('process-payment')
  @ApiOperation({ summary: 'Process payment through adapter' })
  @ApiResponse({ status: 200, description: 'Payment processed via adapter' })
  async processPayment(
    @Body()
    body: {
      amount: number;
      currency: string;
      customerEmail: string;
      cardToken: string;
    },
  ) {
    const paymentRequest: PaymentRequest = {
      amount: body.amount,
      currency: body.currency,
      customerEmail: body.customerEmail,
      paymentMethod: {
        type: 'card',
        token: body.cardToken,
      },
    };

    // Client uses modern interface
    const result = await this.paymentAdapter.processPayment(paymentRequest);

    return {
      pattern: 'Adapter',
      description:
        'Adapter converted modern payment request to legacy system format',
      modernInterface: 'IModernPayment.processPayment()',
      legacyMethod: 'LegacyPaymentSystem.charge()',
      result,
    };
  }

  @Post('refund')
  @ApiOperation({ summary: 'Process refund through adapter' })
  async processRefund(
    @Body()
    body: {
      transactionId: string;
      amount: number;
    },
  ) {
    // Client uses modern interface
    const result = await this.paymentAdapter.refund(body.transactionId, body.amount);

    return {
      pattern: 'Adapter',
      description: 'Adapter converted modern refund to legacy void transaction',
      modernInterface: 'IModernPayment.refund()',
      legacyMethod: 'LegacyPaymentSystem.voidTransaction()',
      result,
    };
  }

  @Get('status/:transactionId')
  @ApiOperation({ summary: 'Get transaction status through adapter' })
  async getStatus(@Param('transactionId') transactionId: string) {
    // Client uses modern interface
    const result = await this.paymentAdapter.getStatus(transactionId);

    return {
      pattern: 'Adapter',
      description: 'Adapter translated legacy status codes to modern format',
      modernInterface: 'IModernPayment.getStatus()',
      legacyMethod: 'LegacyPaymentSystem.checkTransactionStatus()',
      result,
    };
  }
}
