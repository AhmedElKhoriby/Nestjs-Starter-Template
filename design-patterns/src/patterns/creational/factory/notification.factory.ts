import { Injectable, BadRequestException } from '@nestjs/common';
import { INotificationService, NotificationType } from './interfaces/notification.interface';
import { EmailNotificationService } from './services/email-notification.service';
import { SmsNotificationService } from './services/sms-notification.service';
import { PushNotificationService } from './services/push-notification.service';

/**
 * Notification Factory - Factory Pattern Implementation
 * 
 * PROBLEM: We need to create different types of notification services
 * based on user preferences or business logic without coupling the client
 * code to specific notification classes.
 * 
 * SOLUTION: Factory pattern provides a central place to create notification
 * objects based on the requested type.
 * 
 * REAL-WORLD USE CASE:
 * - Multi-channel notification system
 * - User preference-based notification delivery
 * - A/B testing different notification channels
 * - Fallback notification strategies
 */
@Injectable()
export class NotificationFactory {
  constructor(
    private readonly emailService: EmailNotificationService,
    private readonly smsService: SmsNotificationService,
    private readonly pushService: PushNotificationService,
  ) {}

  /**
   * Factory Method - Creates appropriate notification service based on type
   */
  create(type: NotificationType | string): INotificationService {
    const normalizedType = type.toLowerCase();

    switch (normalizedType) {
      case NotificationType.EMAIL:
        return this.emailService;
      
      case NotificationType.SMS:
        return this.smsService;
      
      case NotificationType.PUSH:
        return this.pushService;
      
      default:
        throw new BadRequestException(
          `Unknown notification type: ${type}. Supported types: email, sms, push`,
        );
    }
  }

  /**
   * Get all available notification types
   */
  getAvailableTypes(): string[] {
    return Object.values(NotificationType);
  }

  /**
   * Create multiple notification services for multi-channel delivery
   */
  createMultiple(types: NotificationType[]): INotificationService[] {
    return types.map((type) => this.create(type));
  }

  /**
   * Determine best notification type based on business rules
   * This demonstrates how factory can encapsulate selection logic
   */
  createBestForScenario(scenario: 'urgent' | 'marketing' | 'transactional'): INotificationService {
    switch (scenario) {
      case 'urgent':
        // For urgent notifications, use SMS for immediate delivery
        return this.create(NotificationType.SMS);
      
      case 'marketing':
        // For marketing, use email for rich content
        return this.create(NotificationType.EMAIL);
      
      case 'transactional':
        // For transactional updates, use push for real-time updates
        return this.create(NotificationType.PUSH);
      
      default:
        return this.create(NotificationType.EMAIL);
    }
  }
}
