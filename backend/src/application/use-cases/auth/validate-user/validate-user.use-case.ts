import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../../../domain/repositories';
import { User } from '../../../../domain/entities';
import { USER_REPOSITORY } from 'src/domain/repositories/user-repository.token';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}