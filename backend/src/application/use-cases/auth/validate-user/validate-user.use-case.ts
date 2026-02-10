import { Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../../../domain/repositories';
import { User } from '../../../../domain/entities';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}