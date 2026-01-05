/**
 * Notification Interface
 * 
 * Common interface that all notification types must implement
 */
export interface INotificationService {
  send(recipient: string, message: string, metadata?: any): Promise<NotificationResult>;
  getType(): string;
}

export interface NotificationResult {
  success: boolean;
  type: string;
  recipient: string;
  message: string;
  sentAt: Date;
  metadata?: any;
}

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}
