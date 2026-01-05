import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';

@ApiTags('Behavioral Patterns')
@Controller('patterns/iterator')
export class IteratorController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get('iterate')
  iterate() {
    return {
      pattern: 'Iterator',
      description: 'Iterated through collection without exposing internal structure',
      ...this.collectionService.iterateProducts(),
    };
  }
}
