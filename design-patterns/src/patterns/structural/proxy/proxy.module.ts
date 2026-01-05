import { Module } from '@nestjs/common';
import { DocumentProxy } from './document.proxy';
import { ProxyController } from './proxy.controller';

@Module({
  controllers: [ProxyController],
  providers: [DocumentProxy],
})
export class ProxyModule {}
