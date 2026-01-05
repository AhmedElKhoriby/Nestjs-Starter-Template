export interface IUserService {
  getUser(id: string): Promise<UserData>;
  updateUser(id: string, data: Partial<UserData>): Promise<UserData>;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  lastModified?: Date;
}

export class BaseUserService implements IUserService {
  private users: Map<string, UserData> = new Map();

  constructor() {
    this.users.set('1', { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' });
  }

  async getUser(id: string): Promise<UserData> {
    console.log(`[Base] Getting user ${id}`);
    return this.users.get(id) || { id, name: '', email: '', role: '' };
  }

  async updateUser(id: string, data: Partial<UserData>): Promise<UserData> {
    console.log(`[Base] Updating user ${id}`);
    const user = this.users.get(id);
    if (user) {
      Object.assign(user, data);
    }
    return user || data as UserData;
  }
}

export class LoggingDecorator implements IUserService {
  constructor(private wrapped: IUserService) {}

  async getUser(id: string): Promise<UserData> {
    console.log(`[LoggingDecorator] 📝 Before getting user ${id}`);
    const result = await this.wrapped.getUser(id);
    console.log(`[LoggingDecorator] ✅ After getting user ${id}`);
    return result;
  }

  async updateUser(id: string, data: Partial<UserData>): Promise<UserData> {
    console.log(`[LoggingDecorator] 📝 Before updating user ${id}`, data);
    const result = await this.wrapped.updateUser(id, data);
    console.log(`[LoggingDecorator] ✅ After updating user ${id}`);
    return result;
  }
}

export class CachingDecorator implements IUserService {
  private cache: Map<string, UserData> = new Map();

  constructor(private wrapped: IUserService) {}

  async getUser(id: string): Promise<UserData> {
    if (this.cache.has(id)) {
      console.log(`[CachingDecorator] 💾 Cache HIT for user ${id}`);
      return this.cache.get(id)!;
    }

    console.log(`[CachingDecorator] ❌ Cache MISS for user ${id}`);
    const result = await this.wrapped.getUser(id);
    this.cache.set(id, result);
    return result;
  }

  async updateUser(id: string, data: Partial<UserData>): Promise<UserData> {
    console.log(`[CachingDecorator] 🗑️  Invalidating cache for user ${id}`);
    this.cache.delete(id);
    return this.wrapped.updateUser(id, data);
  }
}

export class AuthorizationDecorator implements IUserService {
  constructor(private wrapped: IUserService, private currentUserRole: string) {}

  async getUser(id: string): Promise<UserData> {
    console.log(`[AuthorizationDecorator] 🔐 Checking permissions for role: ${this.currentUserRole}`);
    // Any role can view users
    return this.wrapped.getUser(id);
  }

  async updateUser(id: string, data: Partial<UserData>): Promise<UserData> {
    console.log(`[AuthorizationDecorator] 🔐 Checking update permissions`);
    if (this.currentUserRole !== 'admin') {
      throw new Error('Unauthorized: Only admins can update users');
    }
    return this.wrapped.updateUser(id, data);
  }
}
