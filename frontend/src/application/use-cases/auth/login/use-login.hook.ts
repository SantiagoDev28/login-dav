import { useState } from 'react';
import type { LoginFormData } from '../../../../organisms/Login/LoginForm';
import type { AuthError } from '../../../../domain/auth/types';
import type { IAuthRepository } from '../../../../domain/auth/repositories';

type UseLoginReturn = {
  login: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const useLogin = (authRepository: IAuthRepository): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = async (data: LoginFormData): Promise<void> => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await authRepository.login({
        email: data.email,
        password: data.password
      });
      
      setIsAuthenticated(true);
      
      setTimeout(() => {
        alert(`¡Bienvenido ${response.user?.name}!`);
      }, 100);
      
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || 'Error al iniciar sesión');
      setIsAuthenticated(false);
      
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    login,
    isLoading,
    error,
    isAuthenticated
  };
};