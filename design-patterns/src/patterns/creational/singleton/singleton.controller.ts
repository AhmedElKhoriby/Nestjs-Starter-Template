import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigurationService } from './configuration.service';

/**
 * Singleton Pattern Controller
 * 
 * Demonstrates the Singleton pattern through configuration management
 */
@ApiTags('Creational Patterns')
@Controller('patterns/singleton')
export class SingletonController {
  constructor(private readonly configService: ConfigurationService) {}

  @Get('config')
  @ApiOperation({ summary: 'Get all configuration' })
  @ApiResponse({ status: 200, description: 'Returns all configuration settings' })
  getAllConfig() {
    return {
      pattern: 'Singleton',
      description: 'Single instance of configuration service',
      instanceInfo: this.configService.getInstanceInfo(),
      config: this.configService.getAll(),
    };
  }

  @Get('config/:key')
  @ApiOperation({ summary: 'Get specific configuration value' })
  getConfigValue(@Param('key') key: string) {
    const value = this.configService.get(key);
    return {
      pattern: 'Singleton',
      key,
      value,
      instanceId: this.configService.getInstanceInfo().instanceId,
    };
  }

  @Post('config')
  @ApiOperation({ summary: 'Set configuration value' })
  setConfigValue(@Body() body: { key: string; value: any }) {
    this.configService.set(body.key, body.value);
    return {
      pattern: 'Singleton',
      message: 'Configuration updated successfully',
      key: body.key,
      value: body.value,
      instanceId: this.configService.getInstanceInfo().instanceId,
    };
  }

  @Get('feature/:name')
  @ApiOperation({ summary: 'Check if feature is enabled' })
  checkFeature(@Param('name') name: string) {
    const enabled = this.configService.isFeatureEnabled(name);
    return {
      pattern: 'Singleton',
      feature: name,
      enabled,
      instanceId: this.configService.getInstanceInfo().instanceId,
    };
  }

  @Get('instance-info')
  @ApiOperation({ 
    summary: 'Get instance information',
    description: 'Proves that this is a Singleton - same instance ID across all requests'
  })
  getInstanceInfo() {
    return {
      pattern: 'Singleton',
      ...this.configService.getInstanceInfo(),
      note: 'The instanceId remains the same across all requests, proving this is a Singleton',
    };
  }
}
