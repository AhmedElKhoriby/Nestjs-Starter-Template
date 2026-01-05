import { v4 as uuidv4 } from 'uuid';
import {
  IProduct,
  ProductSpecifications,
  ProductMedia,
  ProductSEO,
  ProductInventory,
} from '../interfaces/product.interface';

/**
 * Product Template - Concrete Prototype Implementation
 * 
 * This class implements the Prototype pattern by providing a clone method
 * that creates deep copies of product objects.
 */
export class ProductTemplate implements IProduct {
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

  constructor(data: Partial<IProduct>) {
    this.id = data.id || uuidv4();
    this.name = data.name || '';
    this.description = data.description || '';
    this.category = data.category || '';
    this.price = data.price || 0;
    this.currency = data.currency || 'USD';
    this.specifications = data.specifications || {};
    this.media = data.media || { images: [] };
    this.seo = data.seo || {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      slug: '',
    };
    this.inventory = data.inventory || {
      sku: '',
      stock: 0,
      reorderLevel: 0,
    };
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Clone method - Creates a deep copy of the product
   * This is the core of the Prototype pattern
   */
  clone(): ProductTemplate {
    // Create deep copy of complex objects
    const cloned = new ProductTemplate({
      // Generate new ID for the clone
      id: uuidv4(),
      name: this.name,
      description: this.description,
      category: this.category,
      price: this.price,
      currency: this.currency,
      specifications: JSON.parse(JSON.stringify(this.specifications)),
      media: {
        images: [...this.media.images],
        videos: this.media.videos ? [...this.media.videos] : undefined,
        documents: this.media.documents ? [...this.media.documents] : undefined,
      },
      seo: { ...this.seo, keywords: [...this.seo.keywords] },
      inventory: { ...this.inventory },
      createdAt: new Date(), // New creation date for clone
    });

    return cloned;
  }

  /**
   * Clone with customizations
   * Allows cloning and modifying specific properties
   */
  cloneWith(customizations: Partial<IProduct>): ProductTemplate {
    const cloned = this.clone();

    // Apply customizations
    Object.keys(customizations).forEach((key) => {
      if (key !== 'id' && key !== 'createdAt') {
        const productKey = key as keyof IProduct;
        (cloned as any)[productKey] = customizations[productKey];
      }
    });

    return cloned;
  }

  /**
   * Get product summary
   */
  getSummary(): string {
    return `${this.name} - ${this.category} - $${this.price} ${this.currency}`;
  }
}
