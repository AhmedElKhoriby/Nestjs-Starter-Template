import { Injectable } from '@nestjs/common';

class User {
  constructor(public name: string, private mediator: ChatMediator) {}

  send(message: string) {
    console.log(`${this.name} sends: ${message}`);
    this.mediator.sendMessage(message, this);
  }

  receive(message: string, from: User) {
    console.log(`${this.name} received from ${from.name}: ${message}`);
  }
}

@Injectable()
export class ChatMediator {
  private users: User[] = [];

  addUser(name: string): User {
    const user = new User(name, this);
    this.users.push(user);
    return user;
  }

  sendMessage(message: string, from: User) {
    this.users.forEach((user) => {
      if (user !== from) {
        user.receive(message, from);
      }
    });
  }

  demo() {
    const alice = this.addUser('Alice');
    const bob = this.addUser('Bob');
    const charlie = this.addUser('Charlie');

    alice.send('Hello everyone!');
    bob.send('Hi Alice!');

    return {
      users: this.users.map((u) => u.name),
      description: 'Mediator coordinated communication between users',
    };
  }
}
