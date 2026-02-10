import { User } from '../entities';

// PUERTO: Define que se puede hacer, no como.
export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}