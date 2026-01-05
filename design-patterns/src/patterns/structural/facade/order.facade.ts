import { Injectable } from '@nestjs/common';
import {
  InventorySubsystem,
  PaymentSubsystem,
  ShippingSubsystem,
  NotificationSubsystem,
} from './subsystems/order-subsystems';

/**
 * Order Facade - Facade Pattern Implementation
 * 
 * PROBLEM: Order processing involves coordinating multiple complex subsystems
 * (inventory, payment, shipping, notifications). Clients would need to understand
 * and interact with all these subsystems, making the code complex and tightly coupled.
 * 
 * SOLUTION: Facade provides a simplified interface that orchestrates all subsystems
 * behind a single, easy-to-use interface.
 * 
 * REAL-WORLD USE CASE:
 * - E-commerce order processing
 * - Complex API gateways
 * - Multi-step business workflows
 * - System integration layers
 */
@Injectable()
export class OrderFacade {
  private inventorySystem: InventorySubsystem;
  private paymentSystem: PaymentSubsystem;
  private shippingSystem: ShippingSubsystem;
  private notificationSystem: NotificationSubsystem;

  constructor() {
    // Initialize all complex subsystems
    this.inventorySystem = new InventorySubsystem();
    this.paymentSystem = new PaymentSubsystem();
    this.shippingSystem = new ShippingSubsystem();
    this.notificationSystem = new NotificationSubsystem();
  }

  /**
   * Simplified interface: Place Order
   * 
   * This single method orchestrates all subsystems, hiding complexity from the client
   */
  async placeOrder(orderRequest: OrderRequest): Promise<OrderResult> {
    console.log('\n🎯 [Facade] Starting simplified order placement process...\n');

    const steps: string[] = [];

    try {
      // Step 1: Check and reserve inventory
      steps.push('Checking inventory availability');
      const stockAvailable = await this.inventorySystem.checkStock(
        orderRequest.productId,
        orderRequest.quantity,
      );

      if (!stockAvailable) {
        throw new Error('Insufficient stock');
      }

      const reservationId = await this.inventorySystem.reserveStock(
        orderRequest.productId,
        orderRequest.quantity,
      );
      steps.push(`Reserved inventory: ${reservationId}`);

      // Step 2: Calculate shipping cost
      steps.push('Calculating shipping cost');
      const shippingCost = await this.shippingSystem.calculateShippingCost(
        orderRequest.shippingAddress,
      );
      const totalAmount = orderRequest.price * orderRequest.quantity + shippingCost;
      steps.push(`Calculated total: $${totalAmount}`);

      // Step 3: Process payment
      steps.push('Validating payment method');
      await this.paymentSystem.validatePaymentMethod(orderRequest.paymentToken);

      steps.push('Authorizing payment');
      const authId = await this.paymentSystem.authorizePayment(
        totalAmount,
        orderRequest.paymentToken,
      );

      steps.push('Capturing payment');
      const paymentId = await this.paymentSystem.capturePayment(authId);
      steps.push(`Payment captured: ${paymentId}`);

      // Step 4: Create shipment
      const orderId = `ORD-${Date.now()}`;
      steps.push('Creating shipment');
      const shipmentId = await this.shippingSystem.createShipment(
        orderId,
        orderRequest.shippingAddress,
      );

      steps.push('Scheduling pickup');
      const pickupDate = await this.shippingSystem.schedulePickup(shipmentId);
      steps.push(`Pickup scheduled for: ${pickupDate.toLocaleDateString()}`);

      // Step 5: Send notifications
      steps.push('Sending order confirmation');
      await this.notificationSystem.sendOrderConfirmation(orderRequest.customerEmail, orderId);

      steps.push('Sending payment notification');
      await this.notificationSystem.sendPaymentNotification(
        orderRequest.customerEmail,
        totalAmount,
      );

      steps.push('Sending shipping notification');
      await this.notificationSystem.sendShippingNotification(
        orderRequest.customerEmail,
        shipmentId,
      );

      console.log('\n✅ [Facade] Order placement completed successfully!\n');

      return {
        success: true,
        orderId,
        totalAmount,
        shippingCost,
        paymentId,
        shipmentId,
        pickupDate,
        steps,
        message: 'Order placed successfully through Facade',
      };
    } catch (error) {
      console.error('\n❌ [Facade] Order placement failed:', error.message, '\n');

      return {
        success: false,
        orderId: '',
        totalAmount: 0,
        shippingCost: 0,
        paymentId: '',
        shipmentId: '',
        pickupDate: new Date(),
        steps,
        message: `Order failed: ${error.message}`,
      };
    }
  }

  /**
   * Simplified interface: Cancel Order
   * 
   * Orchestrates cancellation across all subsystems
   */
  async cancelOrder(orderId: string, reservationId: string, paymentId: string): Promise<any> {
    console.log('\n🎯 [Facade] Starting simplified order cancellation...\n');

    const steps: string[] = [];

    try {
      // Release inventory
      steps.push('Releasing inventory reservation');
      await this.inventorySystem.releaseStock(reservationId);

      // Refund payment
      steps.push('Processing refund');
      await this.paymentSystem.refundPayment(paymentId);

      console.log('\n✅ [Facade] Order cancellation completed!\n');

      return {
        success: true,
        orderId,
        steps,
        message: 'Order cancelled successfully',
      };
    } catch (error) {
      return {
        success: false,
        orderId,
        steps,
        message: `Cancellation failed: ${error.message}`,
      };
    }
  }
}

export interface OrderRequest {
  productId: string;
  quantity: number;
  price: number;
  customerEmail: string;
  paymentToken: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface OrderResult {
  success: boolean;
  orderId: string;
  totalAmount: number;
  shippingCost: number;
  paymentId: string;
  shipmentId: string;
  pickupDate: Date;
  steps: string[];
  message: string;
}
