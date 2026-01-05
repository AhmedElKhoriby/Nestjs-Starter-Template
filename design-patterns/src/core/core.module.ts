import { Module, Global } from '@nestjs/common';
import { AppLogger } from './services/logger.service';

/**
 * Core Module
 * 
 * Provides shared infrastructure services used across all pattern implementations:
 * - Logger service for consistent logging
 * - Base interfaces and abstractions
 * 
 * This module is Global, so its providers are available throughout the application
 */
@Global()
@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class CoreModule {}
