import { Injectable } from '@nestjs/common';

interface FileSystemComponent {
  name: string;
  getSize(): number;
  print(indent: string): string;
}

class File implements FileSystemComponent {
  constructor(public name: string, private size: number) {}

  getSize(): number {
    return this.size;
  }

  print(indent: string = ''): string {
    return `${indent}📄 ${this.name} (${this.size} KB)`;
  }
}

class Directory implements FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(public name: string) {}

  add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  remove(component: FileSystemComponent): void {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  getSize(): number {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }

  print(indent: string = ''): string {
    let result = `${indent}📁 ${this.name}/\n`;
    this.children.forEach((child) => {
      result += child.print(indent + '  ') + '\n';
    });
    return result.trim();
  }

  getChildren(): FileSystemComponent[] {
    return this.children;
  }
}

@Injectable()
export class FileSystemService {
  createSampleFileSystem(): Directory {
    const root = new Directory('root');
    
    const documents = new Directory('documents');
    documents.add(new File('report.pdf', 250));
    documents.add(new File('presentation.pptx', 500));
    
    const photos = new Directory('photos');
    photos.add(new File('vacation.jpg', 1200));
    photos.add(new File('family.jpg', 1500));
    
    const work = new Directory('work');
    work.add(documents);
    work.add(new File('todo.txt', 5));
    
    root.add(work);
    root.add(photos);
    root.add(new File('readme.txt', 2));
    
    return root;
  }
}
