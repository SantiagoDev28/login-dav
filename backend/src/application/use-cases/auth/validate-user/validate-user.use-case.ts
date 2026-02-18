import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../../../domain/repositories';
import { User } from '../../../../domain/entities';
import { DI_TOKENS } from '../../../../infrastructure/tokens/di.tokens';
import { Email } from 'src/domain/value-objects';

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