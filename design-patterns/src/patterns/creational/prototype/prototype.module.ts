import { Module } from '@nestjs/common';
import { ProductTemplateService } from './product-template.service';
import { PrototypeController } from './prototype.controller';

/**
 * PROTOTYPE PATTERN MODULE
 * 
 * Business Use Case: Product Template Cloning
 * 
 * The Prototype pattern creates new objects by cloning existing objects,
 * avoiding expensive initialization and setup.
 * 
 * Use case: E-commerce product templates where new products are based
 * on existing templates with customizations.
 */
@Module({
  controllers: [PrototypeController],
  providers: [ProductTemplateService],
})
export class PrototypeModule {}
