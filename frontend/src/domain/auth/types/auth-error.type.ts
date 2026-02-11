export type AuthError = {
  message: string;
  code?: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'SERVER_ERROR';
};