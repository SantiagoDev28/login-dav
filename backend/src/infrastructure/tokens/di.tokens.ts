export const DI_TOKENS = {
  UserRepository: Symbol('UserRepository'),
  AuthRepository: Symbol('AuthRepository'),
  PasswordHasher: Symbol('PasswordHasher'),
} as const;