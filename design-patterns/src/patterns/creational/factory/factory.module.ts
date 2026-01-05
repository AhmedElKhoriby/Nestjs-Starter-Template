import { Module } from '@nestjs/common';
import { NotificationFactory } from './notification.factory';
import { EmailNotificationService } from './services/email-notification.service';
import { SmsNotificationService } from './services/sms-notification.service';
import { PushNotificationService } from './services/push-notification.service';
import { FactoryController } from './factory.controller';

/**
 * FACTORY PATTERN MODULE
 * 
 * Business Use Case: Notification System
 * 
 * The Factory pattern provides an interface for creating objects without
 * specifying their exact classes. Used when we need to create different
 * types of notifications based on user preferences or business rules.
 */
@Module({
  controllers: [FactoryController],
  providers: [
    NotificationFactory,
    EmailNotificationService,
    SmsNotificationService,
    PushNotificationService,
  ],
})
export class FactoryModule {}
