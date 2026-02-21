import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../driving/http/controllers/auth';
import { LoginUseCase } from '../../application/use-cases/auth/login';
import { RegisterUseCase } from '../../application/use-cases/auth/register';
import { ValidateUserUseCase } from '../../application/use-cases/auth/validate-user';
import { DI_TOKENS } from '../config/di.tokens';
import { UserTypeOrmRepository } from '../driven/database/typeorm/repositories';
import { UserEntity } from '../driven/database/typeorm/entities/user.entity';
import { BcryptPasswordHasher } from '../security/bcrypt-password-hasher';
import { JwtTokenService } from '../security/jwt-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    ValidateUserUseCase,
    {
      provide: DI_TOKENS.UserRepository,
      useClass: UserTypeOrmRepository,
    },
    {
      provide: DI_TOKENS.PasswordHasher,
      useClass: BcryptPasswordHasher,
    },
    {
      provide: DI_TOKENS.TokenService,
      useClass: JwtTokenService,
    },
  ],
  exports: [LoginUseCase, RegisterUseCase, ValidateUserUseCase],
})
export class AuthModule {}