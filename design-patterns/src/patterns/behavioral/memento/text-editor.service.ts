import { Injectable } from '@nestjs/common';

class TextMemento {
  constructor(public content: string, public timestamp: Date) {}
}

@Injectable()
export class TextEditorService {
  private content = '';
  private history: TextMemento[] = [];

  write(text: string) {
    this.save();
    this.content += text;
    return { content: this.content };
  }

  private save() {
    this.history.push(new TextMemento(this.content, new Date()));
  }

  undo() {
    const memento = this.history.pop();
    if (memento) {
      this.content = memento.content;
    }
    return { content: this.content, historySize: this.history.length };
  }

  getContent() {
    return { content: this.content, historySize: this.history.length };
  }
}
