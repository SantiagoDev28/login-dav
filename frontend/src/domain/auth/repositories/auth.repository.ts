import type { AuthCredentials, AuthResponse } from '../types';

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// PUERTO: Define QUÉ se puede hacer, NO CÓMO
export interface IAuthRepository {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  register(credentials: RegisterCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
}