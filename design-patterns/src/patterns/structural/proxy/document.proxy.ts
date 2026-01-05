import { Injectable } from '@nestjs/common';

interface IDocument {
  load(): Promise<string>;
  getSize(): number;
}

class RealDocument implements IDocument {
  constructor(private id: string) {
    console.log(`[RealDocument] Creating heavy document ${id}...`);
  }

  async load(): Promise<string> {
    console.log(`[RealDocument] Loading heavy document content...`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `Heavy document content for ${this.id} (500MB)`;
  }

  getSize(): number {
    return 500 * 1024 * 1024; // 500MB
  }
}

@Injectable()
export class DocumentProxy implements IDocument {
  private realDocument: RealDocument | null = null;
  private cache: string | null = null;
  private id: string = 'default';

  constructor() {}

  setId(id: string): void {
    if (this.id !== id) {
      // Reset cache if ID changes
      this.id = id;
      this.cache = null;
      this.realDocument = null;
    }
  }

  async load(): Promise<string> {
    console.log(`[Proxy] Load requested for document ${this.id}`);

    if (this.cache) {
      console.log(`[Proxy] ✅ Returning cached content`);
      return this.cache;
    }

    if (!this.realDocument) {
      console.log(`[Proxy] Lazy loading real document...`);
      this.realDocument = new RealDocument(this.id);
    }

    this.cache = await this.realDocument.load();
    return this.cache;
  }

  getSize(): number {
    if (!this.realDocument) {
      console.log(`[Proxy] Returning size without loading document`);
      return 500 * 1024 * 1024;
    }
    return this.realDocument.getSize();
  }
}
