import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DocumentProxy } from './document.proxy';

@ApiTags('Structural Patterns')
@Controller('patterns/proxy')
export class ProxyController {
  constructor(private readonly documentProxy: DocumentProxy) {}

  @Post('load-document')
  @ApiOperation({ summary: 'Load document through proxy (lazy loading + caching)' })
  async loadDocument(@Body() body: { documentId: string }) {
    this.documentProxy.setId(body.documentId);
    const content = await this.documentProxy.load();

    return {
      pattern: 'Proxy',
      description: 'Proxy provides lazy loading and caching for expensive operations',
      content,
      note: 'Call this endpoint again with the same ID to see caching in action',
    };
  }

  @Get('get-size')
  @ApiOperation({ summary: 'Get document size without loading' })
  getSize() {
    const size = this.documentProxy.getSize();

    return {
      pattern: 'Proxy',
      description: 'Proxy returned size without loading the heavy document',
      size: `${size / (1024 * 1024)} MB`,
    };
  }
}
