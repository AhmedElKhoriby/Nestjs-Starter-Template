import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationFactory } from './notification.factory';
import { NotificationType } from './interfaces/notification.interface';

/**
 * Factory Pattern Controller
 * 
 * Demonstrates the Factory pattern through a notification system
 */
@ApiTags('Creational Patterns')
@Controller('patterns/factory')
export class FactoryController {
  constructor(private readonly notificationFactory: NotificationFactory) {}

  @Get('types')
  @ApiOperation({ summary: 'Get available notification types' })
  @ApiResponse({ status: 200, description: 'Returns all available notification types' })
  getAvailableTypes() {
    return {
      pattern: 'Factory',
      description: 'Available notification types that can be created by the factory',
      types: this.notificationFactory.getAvailableTypes(),
    };
  }

  @Post('send')
  @ApiOperation({ summary: 'Send notification using factory' })
  @ApiResponse({ status: 200, description: 'Notification sent successfully' })
  async sendNotification(
    @Body()
    body: {
      type: NotificationType;
      recipient: string;
      message: string;
      metadata?: any;
    },
  ) {
    // Factory creates the appropriate notification service
    const notificationService = this.notificationFactory.create(body.type);

    // Use the created service to send notification
    const result = await notificationService.send(body.recipient, body.message, body.metadata);

    return {
      pattern: 'Factory',
      description: 'Factory created and used the appropriate notification service',
      factoryCreated: notificationService.getType(),
      result,
    };
  }

  @Post('send-multiple')
  @ApiOperation({ summary: 'Send notification via multiple channels' })
  async sendMultipleNotifications(
    @Body()
    body: {
      types: NotificationType[];
      recipient: string;
      message: string;
      metadata?: any;
    },
  ) {
    // Factory creates multiple notification services at once
    const services = this.notificationFactory.createMultiple(body.types);

    // Send via all channels
    const results = await Promise.all(
      services.map((service) => service.send(body.recipient, body.message, body.metadata)),
    );

    return {
      pattern: 'Factory',
      description: 'Factory created multiple notification services for multi-channel delivery',
      channelsUsed: services.map((s) => s.getType()),
      results,
    };
  }

  @Post('send-smart')
  @ApiOperation({ summary: 'Send notification using smart scenario-based selection' })
  async sendSmartNotification(
    @Body()
    body: {
      scenario: 'urgent' | 'marketing' | 'transactional';
      recipient: string;
      message: string;
      metadata?: any;
    },
  ) {
    // Factory intelligently selects the best notification type based on scenario
    const notificationService = this.notificationFactory.createBestForScenario(body.scenario);

    const result = await notificationService.send(body.recipient, body.message, body.metadata);

    return {
      pattern: 'Factory',
      description: 'Factory intelligently selected the best notification type for the scenario',
      scenario: body.scenario,
      selectedType: notificationService.getType(),
      reasoning: this.getScenarioReasoning(body.scenario),
      result,
    };
  }

  private getScenarioReasoning(scenario: string): string {
    const reasons: Record<string, string> = {
      urgent: 'SMS chosen for immediate delivery and high visibility',
      marketing: 'Email chosen for rich content and detailed messaging',
      transactional: 'Push notification chosen for real-time updates',
    };
    return reasons[scenario] || 'Default selection';
  }
}
