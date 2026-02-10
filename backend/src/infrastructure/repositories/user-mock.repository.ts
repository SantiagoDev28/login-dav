import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/repositories';
import { User } from '../../domain/entities';

@Injectable()
export class UserMockRepository implements IUserRepository {
  // 🔒 Base de datos en memoria (mock)
  private users: User[] = [];

  constructor() {
    // Inicializar con usuarios de prueba
    this.seedUsers();
  }

  private async seedUsers() {
    const hashedPassword1 = await bcrypt.hash('123456', 10);
    const hashedPassword2 = await bcrypt.hash('password', 10);
    const hashedPassword3 = await bcrypt.hash('demo123', 10);

    this.users = [
      new User('admin@example.com', 'Administrator', hashedPassword1),
      new User('user@test.com', 'Test User', hashedPassword2),
      new User('demo@demo.com', 'Demo User', hashedPassword3),
    ];
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}