import { Injectable } from '@nestjs/common';

interface Command {
  execute(): string;
  undo(): string;
}

class DatabaseService {
  private records: Map<string, any> = new Map();

  insert(id: string, data: any): string {
    this.records.set(id, data);
    return `Inserted record ${id}`;
  }

  delete(id: string): any {
    const data = this.records.get(id);
    this.records.delete(id);
    return data;
  }

  update(id: string, data: any): any {
    const oldData = this.records.get(id);
    this.records.set(id, data);
    return oldData;
  }
}

class InsertCommand implements Command {
  private db: DatabaseService;
  private id: string;
  private data: any;

  constructor(db: DatabaseService, id: string, data: any) {
    this.db = db;
    this.id = id;
    this.data = data;
  }

  execute(): string {
    console.log(`[InsertCommand] Executing insert`);
    return this.db.insert(this.id, this.data);
  }

  undo(): string {
    console.log(`[InsertCommand] Undoing insert`);
    this.db.delete(this.id);
    return `Undid insert of ${this.id}`;
  }
}

class DeleteCommand implements Command {
  private db: DatabaseService;
  private id: string;
  private deletedData: any;

  constructor(db: DatabaseService, id: string) {
    this.db = db;
    this.id = id;
  }

  execute(): string {
    console.log(`[DeleteCommand] Executing delete`);
    this.deletedData = this.db.delete(this.id);
    return `Deleted record ${this.id}`;
  }

  undo(): string {
    console.log(`[DeleteCommand] Undoing delete`);
    this.db.insert(this.id, this.deletedData);
    return `Restored record ${this.id}`;
  }
}

@Injectable()
export class TaskExecutor {
  private history: Command[] = [];
  private db = new DatabaseService();

  executeCommand(commandType: string, id: string, data?: any) {
    let command: Command;

    if (commandType === 'insert') {
      command = new InsertCommand(this.db, id, data);
    } else {
      command = new DeleteCommand(this.db, id);
    }

    const result = command.execute();
    this.history.push(command);

    return { result, historyLength: this.history.length };
  }

  undo() {
    const command = this.history.pop();
    if (!command) {
      return { result: 'Nothing to undo', historyLength: 0 };
    }

    const result = command.undo();
    return { result, historyLength: this.history.length };
  }
}
