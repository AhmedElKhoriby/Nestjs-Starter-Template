import { Injectable } from '@nestjs/common';

interface ShippingStrategy {
  calculate(weight: number, distance: number): number;
  getEstimatedDays(): number;
  getName(): string;
}

class StandardShipping implements ShippingStrategy {
  calculate(weight: number, distance: number): number {
    return weight * 0.5 + distance * 0.1;
  }

  getEstimatedDays(): number {
    return 7;
  }

  getName(): string {
    return 'Standard Shipping';
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(weight: number, distance: number): number {
    return (weight * 0.5 + distance * 0.1) * 2;
  }

  getEstimatedDays(): number {
    return 2;
  }

  getName(): string {
    return 'Express Shipping';
  }
}

class OvernightShipping implements ShippingStrategy {
  calculate(weight: number, distance: number): number {
    return (weight * 0.5 + distance * 0.1) * 3;
  }

  getEstimatedDays(): number {
    return 1;
  }

  getName(): string {
    return 'Overnight Shipping';
  }
}

@Injectable()
export class ShippingService {
  calculateShipping(strategy: string, weight: number, distance: number) {
    let shippingStrategy: ShippingStrategy;

    switch (strategy) {
      case 'standard':
        shippingStrategy = new StandardShipping();
        break;
      case 'express':
        shippingStrategy = new ExpressShipping();
        break;
      case 'overnight':
        shippingStrategy = new OvernightShipping();
        break;
      default:
        shippingStrategy = new StandardShipping();
    }

    const cost = shippingStrategy.calculate(weight, distance);
    const days = shippingStrategy.getEstimatedDays();
    const name = shippingStrategy.getName();

    return { strategy: name, cost: cost.toFixed(2), estimatedDays: days };
  }
}
