import { Injectable } from '@nestjs/common';

interface MessageSender {
  send(message: string, recipient: string): Promise<string>;
}

class EmailSender implements MessageSender {
  async send(message: string, recipient: string): Promise<string> {
    return `Email sent to ${recipient}: ${message}`;
  }
}

class SmsSender implements MessageSender {
  async send(message: string, recipient: string): Promise<string> {
    return `SMS sent to ${recipient}: ${message}`;
  }
}

abstract class Message {
  constructor(protected sender: MessageSender) {}
  abstract send(recipient: string): Promise<string>;
}

class TextMessage extends Message {
  constructor(sender: MessageSender, private content: string) {
    super(sender);
  }

  async send(recipient: string): Promise<string> {
    return this.sender.send(this.content, recipient);
  }
}

class EncryptedMessage extends Message {
  constructor(sender: MessageSender, private content: string) {
    super(sender);
  }

  async send(recipient: string): Promise<string> {
    const encrypted = `[ENCRYPTED: ${this.content}]`;
    return this.sender.send(encrypted, recipient);
  }
}

@Injectable()
export class MessageService {
  sendMessage(type: 'text' | 'encrypted', channel: 'email' | 'sms', content: string, recipient: string) {
    const sender = channel === 'email' ? new EmailSender() : new SmsSender();
    const message = type === 'text' 
      ? new TextMessage(sender, content)
      : new EncryptedMessage(sender, content);

    return message.send(recipient);
  }
}
