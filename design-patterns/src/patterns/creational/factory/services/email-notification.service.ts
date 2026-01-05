import { Injectable } from '@nestjs/common';
import { INotificationService, NotificationResult } from '../interfaces/notification.interface';

/**
 * Email Notification Service
 * 
 * Concrete implementation for email notifications
 */
@Injectable()
export class EmailNotificationService implements INotificationService {
  async send(recipient: string, message: string, metadata?: any): Promise<NotificationResult> {
    // Simulate email sending logic
    console.log(`📧 Sending email to ${recipient}: ${message}`);
    
    // In production, this would integrate with SendGrid, AWS SES, etc.
    await this.simulateNetworkDelay();

    return {
      success: true,
      type: 'EMAIL',
      recipient,
      message,
      sentAt: new Date(),
      metadata: {
        ...metadata,
        subject: metadata?.subject || 'Notification',
        from: 'noreply@designpatterns.com',
        provider: 'SMTP',
      },
    };
  }

  getType(): string {
    return 'EMAIL';
  }

  private async simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}
