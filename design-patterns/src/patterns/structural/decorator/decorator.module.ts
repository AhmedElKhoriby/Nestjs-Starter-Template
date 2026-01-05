import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { DecoratorController } from './decorator.controller';

@Module({
  controllers: [DecoratorController],
  providers: [UserService],
})
export class DecoratorModule {}
