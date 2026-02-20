import { useState } from 'react';
import type { IAuthRepository } from '../../../../domain/auth/repositories';
import type { AuthError } from '../../../../domain/auth/types';
import type { RegisterCredentials } from '../../../../domain/auth/repositories/auth.repository';

type UseRegisterReturn = {
  register: (data: RegisterCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | undefined;
  isRegistered: boolean;
}

export const useRegister = (authRepository: IAuthRepository): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const register = async (data: RegisterCredentials): Promise<void> => {
    setError(undefined);
    setIsLoading(true);
    try {
      const response = await authRepository.register(data);
      setIsRegistered(true);
      setTimeout(() => {
        alert(`Registro exitoso. ¡Bienvenido ${response.user?.name}!`);
      }, 100);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || 'Error al registrarse');
      setIsRegistered(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    register,
    isLoading,
    error,
    isRegistered,
  };
};
