import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { IteratorController } from './iterator.controller';

@Module({
  controllers: [IteratorController],
  providers: [CollectionService],
})
export class IteratorModule {}
