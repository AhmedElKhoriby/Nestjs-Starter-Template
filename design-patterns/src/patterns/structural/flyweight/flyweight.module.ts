import { Module } from '@nestjs/common';
import { IconFactory } from './icon.factory';
import { FlyweightController } from './flyweight.controller';

@Module({
  controllers: [FlyweightController],
  providers: [IconFactory],
})
export class FlyweightModule {}
