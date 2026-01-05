import { Injectable } from '@nestjs/common';

interface OrderState {
  process(context: OrderContext): string;
  cancel(context: OrderContext): string;
  getStateName(): string;
}

class PendingState implements OrderState {
  process(context: OrderContext): string {
    context.setState(new ProcessingState());
    return 'Order is now being processed';
  }

  cancel(context: OrderContext): string {
    context.setState(new CancelledState());
    return 'Order cancelled';
  }

  getStateName(): string {
    return 'Pending';
  }
}

class ProcessingState implements OrderState {
  process(context: OrderContext): string {
    context.setState(new ShippedState());
    return 'Order shipped';
  }

  cancel(context: OrderContext): string {
    return 'Cannot cancel order being processed';
  }

  getStateName(): string {
    return 'Processing';
  }
}

class ShippedState implements OrderState {
  process(): string {
    return 'Order already shipped';
  }

  cancel(): string {
    return 'Cannot cancel shipped order';
  }

  getStateName(): string {
    return 'Shipped';
  }
}

class CancelledState implements OrderState {
  process(): string {
    return 'Cannot process cancelled order';
  }

  cancel(): string {
    return 'Order already cancelled';
  }

  getStateName(): string {
    return 'Cancelled';
  }
}

class OrderContext {
  private state: OrderState;

  constructor() {
    this.state = new PendingState();
  }

  setState(state: OrderState) {
    this.state = state;
  }

  process(): string {
    return this.state.process(this);
  }

  cancel(): string {
    return this.state.cancel(this);
  }

  getState(): string {
    return this.state.getStateName();
  }
}

@Injectable()
export class OrderStateService {
  private orders = new Map<string, OrderContext>();

  createOrder(orderId: string) {
    const order = new OrderContext();
    this.orders.set(orderId, order);
    return { orderId, state: order.getState() };
  }

  processOrder(orderId: string) {
    const order = this.orders.get(orderId);
    if (!order) return { error: 'Order not found' };

    const result = order.process();
    return { orderId, result, newState: order.getState() };
  }

  cancelOrder(orderId: string) {
    const order = this.orders.get(orderId);
    if (!order) return { error: 'Order not found' };

    const result = order.cancel();
    return { orderId, result, newState: order.getState() };
  }
}
