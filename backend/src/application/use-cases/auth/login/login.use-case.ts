import { Email } from './../../../../domain/value-objects/email.value';
import { Injectable, Inject } from '@nestjs/common';
import type { ITokenService, IUserRepository, IPasswordHasher} from '../../../../domain/repositories';
import { InvalidCredentialsException } from '../../../../domain/exceptions';
import { AuthResponse } from '../../../../domain/types';
import { LoginDto } from '../../../dto/auth';
import { DI_TOKENS } from '../../../../infrastructure/tokens/di.tokens';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(DI_TOKENS.UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(DI_TOKENS.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(DI_TOKENS.TokenService)
    private readonly tokenService: ITokenService
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
    const token = await this.tokenService.generateToken('mock-token'); // Aquí se generaría un JWT real
    return {
      accessToken: token, // Por ahora mock, luego será JWT real
      user: {
        email: user.email.getValue(),
        name: user.name,
      },
    };
  }
}