import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth';
import { LoginUseCase } from '../../application/use-cases/auth/login';
import { ValidateUserUseCase } from '../../application/use-cases/auth/validate-user';
import { UserMockRepository } from '../repositories';
import { USER_REPOSITORY } from 'src/domain/repositories/user-repository.token';

@Module({
  controllers: [AuthController],
  providers: [
    // Use Cases
    LoginUseCase,
    ValidateUserUseCase,
    
    // Repositories
    {
      provide: USER_REPOSITORY,
      useClass: UserMockRepository,
    },
  ],
  exports: [LoginUseCase, ValidateUserUseCase],
})
export class AuthModule {}