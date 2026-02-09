import { useState } from 'react';
import { authService } from '../domain/auth/auth.service';
import type { LoginFormData } from '../organisms/Login/LoginForm';
import type { AuthError } from '../domain/auth/auth.types';

// Tipo de retorno del hook
type UseLoginReturn = {
  login: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}


/**
 * Hook para manejar la lógica de login
 * 
 * Responsabilidades:
 * - Orquestar el proceso de autenticación
 * - Manejar estados de carga y error
 * - Comunicarse con el servicio de auth
 * 
 * @returns API para interactuar con el login
 */


export const useLogin = (): UseLoginReturn => {
  
  // Estados
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  /**
   * Función para realizar el login
   */
  const login = async (data: LoginFormData): Promise<void> => {
    // Limpiar estados previos
    setError(null);
    setIsLoading(true);
    
    try {
      // Llamar al servicio de autenticación
      const response = await authService.login({
        email: data.email,
        password: data.password
      });
      
      // Login exitoso
      setIsAuthenticated(true);
      
      // Aquí podrías guardar el token, redirigir, etc.
      console.log('Login exitoso:', response.user);
      
      // Simular redirección (en app real sería con react-router)
      setTimeout(() => {
        alert(`¡Bienvenido ${response.user?.name}!`);
      }, 100);
      
    } catch (err) {
      // Manejar error
      const authError = err as AuthError;
      setError(authError.message || 'Error al iniciar sesión');
      setIsAuthenticated(false);
      
    } finally {
      // Siempre quitar el loading
      setIsLoading(false);
    }
  };
  
  // Exponer API del hook
  return {
    login,
    isLoading,
    error,
    isAuthenticated
  };
};