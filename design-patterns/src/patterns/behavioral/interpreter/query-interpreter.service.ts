import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryInterpreter {
  private data = [
    { id: 1, name: 'John', age: 30, city: 'NY' },
    { id: 2, name: 'Jane', age: 25, city: 'LA' },
    { id: 3, name: 'Bob', age: 35, city: 'NY' },
  ];

  interpret(query: string) {
    const parts = query.split(' WHERE ');
    let results = this.data;

    if (parts.length > 1) {
      const conditions = parts[1].split(' AND ');
      results = results.filter((item) => {
        return conditions.every((condition) => {
          const [field, value] = condition.split('=').map((s) => s.trim());
          return String(item[field]) === value.replace(/'/g, '');
        });
      });
    }

    return { query, results, count: results.length };
  }
}
