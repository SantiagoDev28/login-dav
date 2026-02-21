import { UserStatus } from '../../src/domain/value-objects';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../src/domain/ports';
import { User } from '../../src/domain/models/entities';
import { Email, Password } from '../../src/domain/value-objects';

@Injectable()
export class UserMockRepository implements IUserRepository {
  // Base de datos en memoria (mock)
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
      new User(
        Email.create('admin@example.com'),
        'Administrador',
        Password.fromHashed(hashedPassword1),
        UserStatus.active(),
      ),
      new User(
        Email.create('user@test.com'),
        'Test User',
        Password.fromHashed(hashedPassword2),
        UserStatus.active(),
      ),
      new User(
        Email.create('demo@demo.com'),
        'Demo User',
        Password.fromHashed(hashedPassword3),
        UserStatus.active(),
      ),
    ];
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = this.users.find((u) => u.email.equals(email));
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
