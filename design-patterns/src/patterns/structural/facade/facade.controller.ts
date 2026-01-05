import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderFacade, OrderRequest } from './order.facade';

/**
 * Facade Pattern Controller
 */
@ApiTags('Structural Patterns')
@Controller('patterns/facade')
export class FacadeController {
  constructor(private readonly orderFacade: OrderFacade) {}

  @Post('place-order')
  @ApiOperation({ summary: 'Place order using facade (simplifies complex process)' })
  async placeOrder(@Body() orderRequest: OrderRequest) {
    // Client only needs to call one simple method
    // Facade handles all complexity internally
    const result = await this.orderFacade.placeOrder(orderRequest);

    return {
      pattern: 'Facade',
      description:
        'Facade orchestrated 4 complex subsystems (inventory, payment, shipping, notifications)',
      subsystemsOrchestrated: [
        'InventorySubsystem',
        'PaymentSubsystem',
        'ShippingSubsystem',
        'NotificationSubsystem',
      ],
      stepsExecuted: result.steps.length,
      result,
    };
  }

  @Post('cancel-order')
  @ApiOperation({ summary: 'Cancel order using facade' })
  async cancelOrder(
    @Body() body: { orderId: string; reservationId: string; paymentId: string },
  ) {
    const result = await this.orderFacade.cancelOrder(
      body.orderId,
      body.reservationId,
      body.paymentId,
    );

    return {
      pattern: 'Facade',
      description: 'Facade simplified order cancellation across multiple subsystems',
      result,
    };
  }
}
