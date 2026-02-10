import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from '../../../../domain/repositories';
import { InvalidCredentialsException } from '../../../../domain/exceptions';
import { AuthResponse } from '../../../../domain/types';
import { LoginDto } from '../../../dto/auth';
import { USER_REPOSITORY } from 'src/domain/repositories/user-repository.token';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponse> {
    // 1. Buscar usuario por email
    const user = await this.userRepository.findByEmail(loginDto.email);

    // 2. Validar que existe
    if (!user) {
      throw new InvalidCredentialsException();
    }

    // 3. Comparar passwords
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    // 4. Retornar respuesta (sin password)
    return {
      accessToken: 'mock-token', // Por ahora mock, luego será JWT real
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}