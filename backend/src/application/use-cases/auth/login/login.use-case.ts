import { Injectable, Inject } from '@nestjs/common';
import type { IUserRepository } from '../../../../domain/repositories';
import type { IPasswordHasher } from 'src/domain/repositories/password-hasher.interface';
import { InvalidCredentialsException } from '../../../../domain/exceptions';
import { AuthResponse } from '../../../../domain/types';
import { LoginDto } from '../../../dto/auth';
import { USER_REPOSITORY } from '../../../../domain/repositories/user-repository.token';
import { PASSWORD_HASHER_TOKEN } from '../../../../domain/repositories/password-hasher.token';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponse> {
    // 1. Buscar usuario por email
    const user = await this.userRepository.findByEmail(loginDto.email);

    // 2. Validar que existe
    if (!user) {
      throw new InvalidCredentialsException();
    }

    // 3. Comparar passwords
    const isPasswordValid = await this.passwordHasher.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    // 4. Retornar respuesta (sin password)
    const token = await this.passwordHasher.generateToken('mock-token'); // Aquí se generaría un JWT real
    return {
      accessToken: token, // Por ahora mock, luego será JWT real
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}