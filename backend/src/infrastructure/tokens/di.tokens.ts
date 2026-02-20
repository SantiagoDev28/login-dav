export const DI_TOKENS = {
  UserRepository: Symbol('UserRepository'),
  TokenService: Symbol('TokenService'),
  PasswordHasher: Symbol('PasswordHasher'),
  LLMProvider: Symbol('LLMProvider'),
} as const;