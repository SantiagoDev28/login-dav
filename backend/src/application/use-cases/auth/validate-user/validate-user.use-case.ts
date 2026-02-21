import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../../../domain/ports';
import { User } from '../../../../domain/models/entities';
import { DI_TOKENS } from '../../../../infrastructure/config/di.tokens';
import { Email } from '../../../../domain/value-objects';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject(DI_TOKENS.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: Email): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}