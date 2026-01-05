import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { SingletonController } from './singleton.controller';

/**
 * SINGLETON PATTERN MODULE
 * 
 * Business Use Case: Application Configuration Manager
 * 
 * The Singleton pattern ensures a class has only one instance and provides
 * a global point of access to it. In NestJS, services are singletons by default.
 */
@Module({
  controllers: [SingletonController],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class SingletonModule {}
