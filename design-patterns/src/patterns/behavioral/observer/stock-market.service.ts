import { Injectable } from '@nestjs/common';

interface Observer {
  update(stock: string, price: number): void;
}

class EmailNotifier implements Observer {
  constructor(private email: string) {}

  update(stock: string, price: number) {
    console.log(`📧 [EmailNotifier] Sending to ${this.email}: ${stock} is now $${price}`);
  }
}

class SmsNotifier implements Observer {
  constructor(private phone: string) {}

  update(stock: string, price: number) {
    console.log(`📱 [SmsNotifier] Sending to ${this.phone}: ${stock} is now $${price}`);
  }
}

class DashboardDisplay implements Observer {
  update(stock: string, price: number) {
    console.log(`📊 [DashboardDisplay] Updating dashboard: ${stock} = $${price}`);
  }
}

@Injectable()
export class StockMarketService {
  private observers: Map<string, Observer[]> = new Map();
  private prices: Map<string, number> = new Map();

  subscribe(stock: string, observer: Observer) {
    if (!this.observers.has(stock)) {
      this.observers.set(stock, []);
    }
    this.observers.get(stock)!.push(observer);
  }

  updatePrice(stock: string, newPrice: number) {
    this.prices.set(stock, newPrice);
    this.notifyObservers(stock, newPrice);
  }

  private notifyObservers(stock: string, price: number) {
    const observers = this.observers.get(stock) || [];
    observers.forEach((observer) => observer.update(stock, price));
  }

  setupDemo(stock: string) {
    const email = new EmailNotifier('investor@example.com');
    const sms = new SmsNotifier('+1234567890');
    const dashboard = new DashboardDisplay();

    this.subscribe(stock, email);
    this.subscribe(stock, sms);
    this.subscribe(stock, dashboard);

    return { observersCount: 3 };
  }
}
