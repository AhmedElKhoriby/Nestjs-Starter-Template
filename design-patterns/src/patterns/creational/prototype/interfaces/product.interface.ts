/**
 * Product interfaces for Prototype pattern
 */

export interface IPrototype {
  clone(): IPrototype;
}

export interface IProduct extends IPrototype {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  specifications: ProductSpecifications;
  media: ProductMedia;
  seo: ProductSEO;
  inventory: ProductInventory;
  createdAt: Date;
  clone(): IProduct;
}

export interface ProductSpecifications {
  dimensions?: { width: number; height: number; depth: number; unit: string };
  weight?: { value: number; unit: string };
  material?: string;
  color?: string;
  features?: string[];
  customFields?: Record<string, any>;
}

export interface ProductMedia {
  images: string[];
  videos?: string[];
  documents?: string[];
}

export interface ProductSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  slug: string;
}

export interface ProductInventory {
  sku: string;
  stock: number;
  reorderLevel: number;
  supplier?: string;
}
