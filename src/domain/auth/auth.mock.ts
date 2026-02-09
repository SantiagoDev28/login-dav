// Base de datos simulada (credenciales válidas)

export const MOCK_USERS = [
  {
    email: 'admin@example.com',
    password: '123456',
    name: 'Administrador'
  },
  {
    email: 'user@test.com',
    password: 'password',
    name: 'Usuario de Prueba'
  },
  {
    email: 'demo@demo.com',
    password: 'demo123',
    name: 'Usuario Demo'
  }
] as const;

// Delays simulados (en milisegundos)
export const AUTH_DELAYS = {
  SUCCESS: 1500,   // 1.5 segundos para simular red
  ERROR: 800       // 800ms para errores
} as const;