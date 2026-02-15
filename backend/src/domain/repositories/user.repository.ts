import { User } from '../entities';
import { Email } from '../value-objects';

// PUERTO: Define que se puede hacer, no como se hace. Es una interfaz que el adaptador debe implementar.
export interface IUserRepository {
  findByEmail(email: Email): Promise<User | null>;
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}