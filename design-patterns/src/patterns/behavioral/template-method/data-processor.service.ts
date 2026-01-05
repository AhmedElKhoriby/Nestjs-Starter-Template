import { Injectable } from '@nestjs/common';

abstract class DataProcessor {
  // Template method defines the algorithm structure
  process(data: any[]): any {
    const loaded = this.loadData(data);
    const transformed = this.transformData(loaded);
    const validated = this.validateData(transformed);
    const saved = this.saveData(validated);
    return saved;
  }

  protected loadData(data: any[]): any[] {
    console.log('[Template] Loading data...');
    return data;
  }

  protected abstract transformData(data: any[]): any[];
  protected abstract validateData(data: any[]): any[];

  protected saveData(data: any[]): any {
    console.log('[Template] Saving data...');
    return { processed: data.length, data };
  }
}

class CsvProcessor extends DataProcessor {
  protected transformData(data: any[]): any[] {
    console.log('[CSV] Transforming CSV data...');
    return data.map((row) => ({ ...row, type: 'csv' }));
  }

  protected validateData(data: any[]): any[] {
    console.log('[CSV] Validating CSV data...');
    return data.filter((row) => row !== null);
  }
}

class JsonProcessor extends DataProcessor {
  protected transformData(data: any[]): any[] {
    console.log('[JSON] Transforming JSON data...');
    return data.map((row) => ({ ...row, type: 'json' }));
  }

  protected validateData(data: any[]): any[] {
    console.log('[JSON] Validating JSON data...');
    return data.filter((row) => Object.keys(row).length > 0);
  }
}

@Injectable()
export class DataProcessorService {
  processData(format: string, data: any[]) {
    let processor: DataProcessor;

    if (format === 'csv') {
      processor = new CsvProcessor();
    } else {
      processor = new JsonProcessor();
    }

    return processor.process(data);
  }
}
