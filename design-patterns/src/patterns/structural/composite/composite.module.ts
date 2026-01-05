import { Module } from '@nestjs/common';
import { FileSystemService } from './filesystem.service';
import { CompositeController } from './composite.controller';

@Module({
  controllers: [CompositeController],
  providers: [FileSystemService],
})
export class CompositeModule {}
