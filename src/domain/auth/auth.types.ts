// Tipos del dominio de autenticación
// Credenciales que recibe el service
export type AuthCredentials = {
  email: string;
  password: string;
}

// Respuesta exitosa del login
export type AuthResponse = {
  success: boolean;
  message: string;
  user?: {
    email: string;
    name: string;
  }
}

// Error de autenticación
export type AuthError = {
  message: string;
  code?: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'SERVER_ERROR';
}