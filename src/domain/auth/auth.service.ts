import type { AuthCredentials, AuthResponse, AuthError } from './auth.types';
import { MOCK_USERS, AUTH_DELAYS } from './auth.mock';

// Servicio de autenticación
// Este servicio simula una llamada a una API real

export const authService = {


  /**
   * Intenta autenticar al usuario con las credenciales proporcionadas
   * @param credentials - Email y password del usuario
   * @returns Promise con la respuesta de autenticación
   * @throws AuthError si las credenciales son inválidas
   */


  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, AUTH_DELAYS.SUCCESS));
    
    // Buscar usuario en la "base de datos"
    const user = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    // Si no existe, lanzar error
    if (!user) {
      await new Promise(resolve => setTimeout(resolve, AUTH_DELAYS.ERROR));
      
      const error: AuthError = {
        message: 'Credenciales incorrectas',
        code: 'INVALID_CREDENTIALS'
      };
      throw error;
    }
    
    // Si existe, retornar respuesta exitosa
    return {
      success: true,
      message: 'Login exitoso',
      user: {
        email: user.email,
        name: user.name
      }
    };
  },
  
  /**
   * Cierra la sesión del usuario (simulado)
   */
  logout: async (): Promise<void> => {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // En una app real, aquí limpiarías tokens, cookies, etc.
  }
};