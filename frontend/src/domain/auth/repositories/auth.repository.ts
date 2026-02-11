import type { AuthCredentials, AuthResponse } from '../types';

// PUERTO: Define QUÉ se puede hacer, NO CÓMO
export interface IAuthRepository {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
}