import { Injectable } from '@nestjs/common';

/**
 * Configuration Service - Singleton Pattern Implementation
 * 
 * PROBLEM: We need a single source of truth for application configuration
 * that is accessible throughout the application without creating multiple instances.
 * 
 * SOLUTION: Use Singleton pattern to ensure only one configuration instance exists.
 * NestJS automatically implements Singleton pattern for all Injectable services.
 * 
 * REAL-WORLD USE CASE:
 * - Application settings management
 * - Feature flags
 * - API keys and credentials
 * - Environment configuration
 */
@Injectable()
export class ConfigurationService {
  private config: Map<string, any> = new Map();
  private readonly instanceId: string;
  private createdAt: Date;

  constructor() {
    // Demonstrate this is truly a singleton
    this.instanceId = Math.random().toString(36).substring(7);
    this.createdAt = new Date();
    
    // Initialize default configuration
    this.initializeDefaultConfig();
  }

  private initializeDefaultConfig() {
    this.config.set('app.name', 'NestJS Design Patterns Demo');
    this.config.set('app.version', '1.0.0');
    this.config.set('features.notifications', true);
    this.config.set('features.analytics', true);
    this.config.set('payment.maxRetries', 3);
    this.config.set('payment.timeout', 30000);
    this.config.set('security.jwtExpiration', '1h');
    this.config.set('security.bcryptRounds', 10);
  }

  /**
   * Get a configuration value by key
   */
  get(key: string): any {
    return this.config.get(key);
  }

  /**
   * Set a configuration value
   */
  set(key: string, value: any): void {
    this.config.set(key, value);
  }

  /**
   * Get all configuration as an object
   */
  getAll(): Record<string, any> {
    const configObj: Record<string, any> = {};
    this.config.forEach((value, key) => {
      configObj[key] = value;
    });
    return configObj;
  }

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(featureName: string): boolean {
    return this.config.get(`features.${featureName}`) === true;
  }

  /**
   * Get instance information - proves this is a Singleton
   */
  getInstanceInfo() {
    return {
      instanceId: this.instanceId,
      createdAt: this.createdAt,
      configCount: this.config.size,
    };
  }
}
