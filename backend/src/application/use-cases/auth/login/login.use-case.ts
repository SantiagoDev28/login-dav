import { Email } from './../../../../domain/value-objects/email.value';
import { Injectable, Inject } from '@nestjs/common';
import type { IAuthRepository, IUserRepository } from '../../../../domain/repositories';
import type { IPasswordHasher } from 'src/domain/repositories/password-hasher.repository';
import { InvalidCredentialsException } from '../../../../domain/exceptions';
import { AuthResponse } from '../../../../domain/types';
import { LoginDto } from '../../../dto/auth';
import { USER_REPOSITORY } from '../../../../domain/repositories/user-repository.token';
import { PASSWORD_HASHER_TOKEN } from '../../../../domain/repositories/password-hasher.token';
import { AUTH_REPOSITORY_TOKEN } from '../../../../domain/repositories/auth-repository.token';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponse> {
    // 1. Buscar usuario por email
    const emailVO = Email.create(loginDto.email)
    const user = await this.userRepository.findByEmail(emailVO);

    // 2. Validar que existe
    if (!user) {
      throw new InvalidCredentialsException();
    }

    // 3. Comparar passwords
    const isPasswordValid = await this.passwordHasher.compare(
      loginDto.password,
      user.password.getValue(),
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    // 4. Retornar respuesta (sin password)
    const token = await this.authRepository.generateToken('mock-token'); // Aquí se generaría un JWT real
    return {
      accessToken: token, // Por ahora mock, luego será JWT real
      user: {
        email: user.email.getValue(),
        name: user.name,
      },
    };
  }
}