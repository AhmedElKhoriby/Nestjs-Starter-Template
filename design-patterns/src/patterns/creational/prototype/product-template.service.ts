import { Injectable } from '@nestjs/common';
import { ProductTemplate } from './models/product-template.model';
import { IProduct } from './interfaces/product.interface';

/**
 * Product Template Service - Prototype Pattern Implementation
 * 
 * PROBLEM: Creating new products from scratch is time-consuming. Many products
 * share similar attributes and differ only in specific details. We want to
 * avoid duplicating initialization logic.
 * 
 * SOLUTION: Prototype pattern allows us to clone existing product templates
 * and customize them, significantly reducing setup time.
 * 
 * REAL-WORLD USE CASE:
 * - E-commerce product variants (size, color variations)
 * - Document templates
 * - Game character templates
 * - Test data generation
 */
@Injectable()
export class ProductTemplateService {
  private templates: Map<string, ProductTemplate> = new Map();

  constructor() {
    this.initializeTemplates();
  }

  /**
   * Initialize predefined product templates
   */
  private initializeTemplates() {
    // Electronics Template
    const electronicsTemplate = new ProductTemplate({
      name: 'Electronic Device Template',
      description: 'Base template for electronic devices',
      category: 'Electronics',
      price: 0,
      currency: 'USD',
      specifications: {
        dimensions: { width: 0, height: 0, depth: 0, unit: 'cm' },
        weight: { value: 0, unit: 'kg' },
        features: ['Warranty Included', 'Energy Efficient'],
        customFields: {
          powerConsumption: '0W',
          certifications: ['CE', 'FCC'],
        },
      },
      media: {
        images: ['placeholder-electronics.jpg'],
      },
      seo: {
        metaTitle: 'Electronic Device',
        metaDescription: 'High-quality electronic device',
        keywords: ['electronics', 'device', 'technology'],
        slug: 'electronic-device',
      },
      inventory: {
        sku: 'ELEC-000',
        stock: 0,
        reorderLevel: 10,
        supplier: 'Electronics Supplier Co.',
      },
    });
    this.templates.set('electronics', electronicsTemplate);

    // Clothing Template
    const clothingTemplate = new ProductTemplate({
      name: 'Clothing Item Template',
      description: 'Base template for clothing items',
      category: 'Clothing',
      price: 0,
      currency: 'USD',
      specifications: {
        material: 'Cotton',
        color: 'Various',
        features: ['Machine Washable', 'Comfortable Fit'],
        customFields: {
          sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          careInstructions: 'Machine wash cold, tumble dry low',
        },
      },
      media: {
        images: ['placeholder-clothing.jpg'],
      },
      seo: {
        metaTitle: 'Clothing Item',
        metaDescription: 'Comfortable and stylish clothing',
        keywords: ['clothing', 'fashion', 'apparel'],
        slug: 'clothing-item',
      },
      inventory: {
        sku: 'CLT-000',
        stock: 0,
        reorderLevel: 20,
        supplier: 'Fashion Supplier Inc.',
      },
    });
    this.templates.set('clothing', clothingTemplate);

    // Book Template
    const bookTemplate = new ProductTemplate({
      name: 'Book Template',
      description: 'Base template for books',
      category: 'Books',
      price: 0,
      currency: 'USD',
      specifications: {
        customFields: {
          author: 'Author Name',
          publisher: 'Publisher Name',
          isbn: '000-0-00-000000-0',
          pages: 0,
          language: 'English',
          format: 'Hardcover',
        },
      },
      media: {
        images: ['placeholder-book.jpg'],
      },
      seo: {
        metaTitle: 'Book Title',
        metaDescription: 'Engaging and informative book',
        keywords: ['book', 'reading', 'literature'],
        slug: 'book-title',
      },
      inventory: {
        sku: 'BOOK-000',
        stock: 0,
        reorderLevel: 5,
        supplier: 'Book Distributor Ltd.',
      },
    });
    this.templates.set('book', bookTemplate);
  }

  /**
   * Get available template types
   */
  getTemplateTypes(): string[] {
    return Array.from(this.templates.keys());
  }

  /**
   * Get a template by type
   */
  getTemplate(type: string): ProductTemplate | undefined {
    return this.templates.get(type);
  }

  /**
   * Clone a product from template
   */
  cloneFromTemplate(
    templateType: string,
    customizations?: Partial<IProduct>,
  ): ProductTemplate | null {
    const template = this.templates.get(templateType);

    if (!template) {
      return null;
    }

    // Clone the template
    if (customizations) {
      return template.cloneWith(customizations);
    }

    return template.clone();
  }

  /**
   * Clone an existing product
   */
  cloneProduct(product: ProductTemplate): ProductTemplate {
    return product.clone();
  }

  /**
   * Create product variants (e.g., different colors, sizes)
   */
  createVariants(
    baseProduct: ProductTemplate,
    variants: Array<{ name: string; customizations: Partial<IProduct> }>,
  ): ProductTemplate[] {
    return variants.map((variant) => {
      const cloned = baseProduct.cloneWith(variant.customizations);
      cloned.name = variant.name;
      return cloned;
    });
  }

  /**
   * Register a new template
   */
  registerTemplate(type: string, template: ProductTemplate): void {
    this.templates.set(type, template);
  }
}
