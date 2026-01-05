import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductTemplateService } from './product-template.service';
import { IProduct } from './interfaces/product.interface';
import { ProductTemplate } from './models/product-template.model';

/**
 * Prototype Pattern Controller
 * 
 * Demonstrates the Prototype pattern through product template cloning
 */
@ApiTags('Creational Patterns')
@Controller('patterns/prototype')
export class PrototypeController {
  constructor(private readonly templateService: ProductTemplateService) {}

  @Get('templates')
  @ApiOperation({ summary: 'Get available product templates' })
  getTemplates() {
    return {
      pattern: 'Prototype',
      description: 'Available templates that can be cloned to create new products',
      templates: this.templateService.getTemplateTypes(),
    };
  }

  @Get('templates/:type')
  @ApiOperation({ summary: 'Get specific template details' })
  getTemplate(@Param('type') type: string) {
    const template = this.templateService.getTemplate(type);

    if (!template) {
      return {
        pattern: 'Prototype',
        error: `Template type '${type}' not found`,
        availableTypes: this.templateService.getTemplateTypes(),
      };
    }

    return {
      pattern: 'Prototype',
      description: 'Template that serves as a prototype for cloning',
      template,
    };
  }

  @Post('clone-from-template')
  @ApiOperation({ summary: 'Clone a product from a template' })
  @ApiResponse({ status: 200, description: 'Product cloned successfully' })
  cloneFromTemplate(
    @Body()
    body: {
      templateType: string;
      customizations?: Partial<IProduct>;
    },
  ) {
    const cloned = this.templateService.cloneFromTemplate(
      body.templateType,
      body.customizations,
    );

    if (!cloned) {
      return {
        pattern: 'Prototype',
        error: `Template type '${body.templateType}' not found`,
      };
    }

    return {
      pattern: 'Prototype',
      description: 'Created new product by cloning template',
      operation: 'clone',
      originalTemplate: body.templateType,
      customizationsApplied: !!body.customizations,
      clonedProduct: cloned,
    };
  }

  @Post('create-laptop')
  @ApiOperation({ summary: 'Create a laptop product from electronics template' })
  createLaptop() {
    const laptop = this.templateService.cloneFromTemplate('electronics', {
      name: 'Professional Laptop Pro 15',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      specifications: {
        dimensions: { width: 35, height: 2.5, depth: 24, unit: 'cm' },
        weight: { value: 1.8, unit: 'kg' },
        features: [
          'Intel Core i7 Processor',
          '16GB RAM',
          '512GB SSD',
          'Full HD Display',
          '10-hour Battery Life',
        ],
        customFields: {
          processor: 'Intel Core i7-12700H',
          ram: '16GB DDR4',
          storage: '512GB NVMe SSD',
          display: '15.6" Full HD IPS',
          graphics: 'Intel Iris Xe',
          os: 'Windows 11 Pro',
        },
      },
      seo: {
        metaTitle: 'Professional Laptop Pro 15 - High Performance Computing',
        metaDescription: 'Premium laptop with Intel Core i7, 16GB RAM, and 512GB SSD',
        keywords: ['laptop', 'professional', 'intel', 'high-performance'],
        slug: 'professional-laptop-pro-15',
      },
      inventory: {
        sku: 'ELEC-LAP-001',
        stock: 25,
        reorderLevel: 10,
      },
    });

    return {
      pattern: 'Prototype',
      description: 'Cloned electronics template and customized for laptop',
      product: laptop,
    };
  }

  @Post('create-variants')
  @ApiOperation({ summary: 'Create product variants from a base product' })
  createVariants() {
    // First, create a base t-shirt product
    const baseTShirt = this.templateService.cloneFromTemplate('clothing', {
      name: 'Premium Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt',
      price: 29.99,
      specifications: {
        material: '100% Cotton',
        features: ['Breathable', 'Pre-shrunk', 'Tag-free'],
      },
    });

    if (!baseTShirt) {
      return { error: 'Could not create base product' };
    }

    // Create color variants using Prototype pattern
    const variants = this.templateService.createVariants(baseTShirt, [
      {
        name: 'Premium Cotton T-Shirt - Black',
        customizations: {
          specifications: {
            ...baseTShirt.specifications,
            color: 'Black',
          },
          inventory: {
            sku: 'CLT-TSH-BLK',
            stock: 100,
            reorderLevel: 20,
          },
        },
      },
      {
        name: 'Premium Cotton T-Shirt - White',
        customizations: {
          specifications: {
            ...baseTShirt.specifications,
            color: 'White',
          },
          inventory: {
            sku: 'CLT-TSH-WHT',
            stock: 120,
            reorderLevel: 20,
          },
        },
      },
      {
        name: 'Premium Cotton T-Shirt - Navy',
        customizations: {
          specifications: {
            ...baseTShirt.specifications,
            color: 'Navy',
          },
          inventory: {
            sku: 'CLT-TSH-NAV',
            stock: 80,
            reorderLevel: 20,
          },
        },
      },
    ]);

    return {
      pattern: 'Prototype',
      description: 'Created product variants by cloning base product',
      baseProduct: baseTShirt.getSummary(),
      variantsCreated: variants.length,
      variants: variants.map((v) => ({
        id: v.id,
        name: v.name,
        color: v.specifications.color,
        sku: v.inventory.sku,
        stock: v.inventory.stock,
      })),
    };
  }

  @Post('register-custom-template')
  @ApiOperation({ summary: 'Register a new custom template' })
  registerCustomTemplate(
    @Body()
    body: {
      templateType: string;
      productData: Partial<IProduct>;
    },
  ) {
    const template = new ProductTemplate(body.productData);
    this.templateService.registerTemplate(body.templateType, template);

    return {
      pattern: 'Prototype',
      description: 'Registered new custom template for future cloning',
      templateType: body.templateType,
      template,
    };
  }
}
