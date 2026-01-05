import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IconFactory } from './icon.factory';

@ApiTags('Structural Patterns')
@Controller('patterns/flyweight')
export class FlyweightController {
  constructor(private readonly iconFactory: IconFactory) {}

  @Post('render-icons')
  @ApiOperation({ summary: 'Render multiple icons using flyweight pattern' })
  renderIcons(@Body() body: { icons: Array<{ type: string; x: number; y: number; color: string }> }) {
    const renderedIcons = body.icons.map((iconData) => {
      const icon = this.iconFactory.getIcon(iconData.type);
      return icon.render(iconData.x, iconData.y, iconData.color);
    });

    return {
      pattern: 'Flyweight',
      description: 'Reused icon flyweights instead of creating new objects',
      renderedIcons,
      stats: this.iconFactory.getStats(),
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get flyweight statistics' })
  getStats() {
    return {
      pattern: 'Flyweight',
      ...this.iconFactory.getStats(),
    };
  }
}
