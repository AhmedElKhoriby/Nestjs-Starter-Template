import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './services/user.service';

@ApiTags('Structural Patterns')
@Controller('patterns/decorator')
export class DecoratorController {
  constructor(private readonly userService: UserService) {}

  @Post('get-user')
  @ApiOperation({ summary: 'Get user with decorators applied' })
  async getUser(@Body() body: { userId: string; decorators: string[] }) {
    const service = this.userService.createDecoratedService(body.decorators);
    const user = await service.getUser(body.userId);

    return {
      pattern: 'Decorator',
      description: 'Multiple decorators wrapped around base service',
      decoratorsApplied: body.decorators,
      user,
    };
  }

  @Post('update-user')
  @ApiOperation({ summary: 'Update user with authorization decorator' })
  async updateUser(
    @Body() body: { userId: string; data: any; userRole: string; decorators: string[] },
  ) {
    try {
      const service = this.userService.createDecoratedService(body.decorators, body.userRole);
      const user = await service.updateUser(body.userId, body.data);

      return {
        pattern: 'Decorator',
        description: 'Decorators added authorization and logging',
        decoratorsApplied: body.decorators,
        user,
      };
    } catch (error) {
      return {
        pattern: 'Decorator',
        error: error.message,
        decoratorsApplied: body.decorators,
      };
    }
  }
}
