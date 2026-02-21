import { Email } from '../../../../domain/value-objects/email.vo';
import { Password } from '../../../../domain/value-objects/password.vo';
import { UserStatus } from '../../../../domain/value-objects/user-status.vo';
import { Injectable, Inject } from '@nestjs/common';
import type { IUserRepository, IPasswordHasher } from '../../../../domain/ports';
import { User } from '../../../../domain/models/entities';
import { UserAlreadyExistsException } from '../../../../domain/exceptions';
import { AuthResponse } from '../../../../domain/models/types';
import { RegisterDto } from '../../../dto/auth';
import { DI_TOKENS } from '../../../../infrastructure/config/di.tokens';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(DI_TOKENS.UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(DI_TOKENS.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(registerDto: RegisterDto): Promise<AuthResponse> {
    // 1. Validar que el email no exista
    const emailVO = Email.create(registerDto.email);
    const existingUser = await this.userRepository.findByEmail(emailVO);

    if (existingUser) {
      throw new UserAlreadyExistsException(registerDto.email);
    }

    // 2. Validar y crear Password value object
    const passwordVO = Password.fromPlain(registerDto.password);

    // 3. Hash del password
    const hashedPassword = await this.passwordHasher.hash(
      registerDto.password,
    );
    const hashedPasswordVO = Password.fromHashed(hashedPassword);

    // 4. Crear entidad User
    const newUser = new User(
      emailVO,
      registerDto.name,
      hashedPasswordVO,
      UserStatus.active(),
    );

    // 5. Persistir usuario
    const savedUser = await this.userRepository.create(newUser);

    // 6. Retornar respuesta (sin password)
    return {
      accessToken: null, // En registro no retornamos token automáticamente
      user: {
        email: savedUser.email.getValue(),
        name: savedUser.name,
      },
    };
  }
}
