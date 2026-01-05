import { Injectable } from '@nestjs/common';

interface Visitor {
  visitBook(book: Book): string;
  visitElectronics(electronics: Electronics): string;
}

interface Product {
  accept(visitor: Visitor): string;
  getPrice(): number;
}

class Book implements Product {
  constructor(public title: string, private price: number) {}

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): string {
    return visitor.visitBook(this);
  }
}

class Electronics implements Product {
  constructor(public name: string, private price: number) {}

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): string {
    return visitor.visitElectronics(this);
  }
}

class TaxCalculator implements Visitor {
  visitBook(book: Book): string {
    const tax = book.getPrice() * 0.05; // 5% tax on books
    return `Book "${book.title}" tax: $${tax.toFixed(2)}`;
  }

  visitElectronics(electronics: Electronics): string {
    const tax = electronics.getPrice() * 0.15; // 15% tax on electronics
    return `Electronics "${electronics.name}" tax: $${tax.toFixed(2)}`;
  }
}

class ShippingCalculator implements Visitor {
  visitBook(book: Book): string {
    const shipping = 3.99; // Flat rate for books
    return `Book "${book.title}" shipping: $${shipping.toFixed(2)}`;
  }

  visitElectronics(electronics: Electronics): string {
    const shipping = electronics.getPrice() * 0.1; // 10% of price
    return `Electronics "${electronics.name}" shipping: $${shipping.toFixed(2)}`;
  }
}

@Injectable()
export class ReportVisitorService {
  calculate(visitorType: string) {
    const products: Product[] = [
      new Book('Design Patterns', 49.99),
      new Electronics('Laptop', 999.99),
      new Book('Clean Code', 39.99),
    ];

    const visitor: Visitor =
      visitorType === 'tax' ? new TaxCalculator() : new ShippingCalculator();

    const results = products.map((product) => product.accept(visitor));

    return { visitorType, results };
  }
}
