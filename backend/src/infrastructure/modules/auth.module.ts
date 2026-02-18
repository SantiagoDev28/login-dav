import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth';
import { LoginUseCase } from '../../application/use-cases/auth/login';
import { ValidateUserUseCase } from '../../application/use-cases/auth/validate-user';
import { UserMockRepository } from '../repositories';
import { DI_TOKENS } from '../tokens/di.tokens';
import { PrismaService } from '../database/primsa.service';

@Module({
  controllers: [AuthController],
  
  providers: [
    // Use Cases
    PrismaService,
    LoginUseCase,
    ValidateUserUseCase,
    
    // Repositories
    {
      provide: DI_TOKENS.UserRepository,
      useClass: UserMockRepository,
    },

    {
      provide: DI_TOKENS.PasswordHasher,
      useClass: UserMockRepository,
    },

    {
      provide: DI_TOKENS.AuthRepository,
      useClass: UserMockRepository,
    }
  ],
  exports: [LoginUseCase, ValidateUserUseCase],
})
export class AuthModule {}