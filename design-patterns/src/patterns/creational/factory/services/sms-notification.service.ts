import { Injectable } from '@nestjs/common';
import { INotificationService, NotificationResult } from '../interfaces/notification.interface';

/**
 * SMS Notification Service
 * 
 * Concrete implementation for SMS notifications
 */
@Injectable()
export class SmsNotificationService implements INotificationService {
  async send(recipient: string, message: string, metadata?: any): Promise<NotificationResult> {
    // Simulate SMS sending logic
    console.log(`📱 Sending SMS to ${recipient}: ${message}`);
    
    // In production, this would integrate with Twilio, AWS SNS, etc.
    await this.simulateNetworkDelay();

    return {
      success: true,
      type: 'SMS',
      recipient,
      message: this.truncateMessage(message, 160), // SMS character limit
      sentAt: new Date(),
      metadata: {
        ...metadata,
        provider: 'Twilio',
        messageLength: message.length,
        segmentCount: Math.ceil(message.length / 160),
      },
    };
  }

  getType(): string {
    return 'SMS';
  }

  private truncateMessage(message: string, maxLength: number): string {
    return message.length > maxLength ? message.substring(0, maxLength - 3) + '...' : message;
  }

  private async simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}
