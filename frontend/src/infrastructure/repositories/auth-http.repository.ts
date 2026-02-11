import type { IAuthRepository } from '../../domain/auth/repositories';
import type { AuthCredentials, AuthResponse, AuthError } from '../../domain/auth/types';

const API_URL = 'http://localhost:3000';

export class AuthHttpRepository implements IAuthRepository {
  
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error: AuthError = {
          message: errorData.message || 'Error al iniciar sesión',
          code: 'INVALID_CREDENTIALS'
        };
        throw error;
      }

      const data = await response.json();
      
      return {
        success: true,
        message: 'Login exitoso',
        user: {
          email: data.user.email,
          name: data.user.name
        }
      };
      
    } catch (error) {
      if ((error as AuthError).code) {
        throw error;
      }
      
      const authError: AuthError = {
        message: 'Error de conexión con el servidor',
        code: 'SERVER_ERROR'
      };
      throw authError;
    }
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}