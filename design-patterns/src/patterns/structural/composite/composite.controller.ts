import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileSystemService } from './filesystem.service';

@ApiTags('Structural Patterns')
@Controller('patterns/composite')
export class CompositeController {
  constructor(private readonly fileSystemService: FileSystemService) {}

  @Get('filesystem')
  @ApiOperation({ summary: 'Get file system tree (composite pattern)' })
  getFileSystem() {
    const root = this.fileSystemService.createSampleFileSystem();

    return {
      pattern: 'Composite',
      description: 'Treats individual files and directories uniformly',
      totalSize: `${root.getSize()} KB`,
      tree: root.print(),
    };
  }
}
