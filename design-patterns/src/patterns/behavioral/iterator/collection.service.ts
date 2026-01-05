import { Injectable } from '@nestjs/common';

class ProductCollection {
  private items: any[] = [];

  addItem(item: any) {
    this.items.push(item);
  }

  createIterator() {
    return new ProductIterator(this.items);
  }
}

class ProductIterator {
  private position = 0;

  constructor(private items: any[]) {}

  hasNext(): boolean {
    return this.position < this.items.length;
  }

  next(): any {
    return this.items[this.position++];
  }

  reset() {
    this.position = 0;
  }
}

@Injectable()
export class CollectionService {
  iterateProducts() {
    const collection = new ProductCollection();
    collection.addItem({ name: 'Laptop', price: 999 });
    collection.addItem({ name: 'Mouse', price: 29 });
    collection.addItem({ name: 'Keyboard', price: 79 });

    const iterator = collection.createIterator();
    const results = [];

    while (iterator.hasNext()) {
      results.push(iterator.next());
    }

    return { results, count: results.length };
  }
}
