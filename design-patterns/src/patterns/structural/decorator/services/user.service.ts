import { Injectable } from '@nestjs/common';
import {
  BaseUserService,
  LoggingDecorator,
  CachingDecorator,
  AuthorizationDecorator,
  IUserService,
} from './user.decorators';

@Injectable()
export class UserService {
  createDecoratedService(decorators: string[], userRole: string = 'user'): IUserService {
    let service: IUserService = new BaseUserService();

    decorators.forEach((decorator) => {
      switch (decorator) {
        case 'logging':
          service = new LoggingDecorator(service);
          break;
        case 'caching':
          service = new CachingDecorator(service);
          break;
        case 'authorization':
          service = new AuthorizationDecorator(service, userRole);
          break;
      }
    });

    return service;
  }
}
