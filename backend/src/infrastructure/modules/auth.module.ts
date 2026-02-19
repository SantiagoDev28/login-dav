import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';  // ← agregar
import { ConfigModule, ConfigService } from '@nestjs/config';  // ← agregar
import { AuthController } from '../controllers/auth';
import { LoginUseCase } from '../../application/use-cases/auth/login';
import { ValidateUserUseCase } from '../../application/use-cases/auth/validate-user';
import { DI_TOKENS } from '../tokens/di.tokens';
import { UserTypeOrmRepository } from '../repositories';
import { UserEntity } from '../database/typeorm/user.entity';
import { BcryptPasswordHasher } from '../security/bcrypt-password-hasher';
import { JwtTokenService } from '../security/jwt-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({          // ← agregar este bloque
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
  exports: [LoginUseCase, ValidateUserUseCase],
})
export class AuthModule {}