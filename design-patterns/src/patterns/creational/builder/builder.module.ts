import { Module } from '@nestjs/common';
import { ReportBuilder } from './report.builder';
import { BuilderController } from './builder.controller';

/**
 * BUILDER PATTERN MODULE
 * 
 * Business Use Case: Complex Report Generation
 * 
 * The Builder pattern separates the construction of a complex object from its
 * representation, allowing the same construction process to create different representations.
 * 
 * Use case: Building complex business reports with many optional components
 */
@Module({
  controllers: [BuilderController],
  providers: [ReportBuilder],
})
export class BuilderModule {}
