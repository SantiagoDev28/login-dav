import { IUserRepository } from './domain/repositories/user.repository';
import { IPasswordHasher } from './domain/repositories/password-hasher.repository';
import { LoginUseCase } from './application/use-cases/auth/login';
import { InvalidCredentialsException } from './domain/exceptions';
import { IAuthRepository } from './domain/repositories';
import { User } from './domain/entities/user.entity';
import { Password, UserStatus, Email } from './domain/value-objects';

describe('LoginUseCase', () => {
  let userRepository: IUserRepository;
  let passwordHasher: IPasswordHasher;
  let authRepository: IAuthRepository;
  let loginUseCase: LoginUseCase;

  beforeEach(() => {
    // Crear mocks
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    passwordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<IPasswordHasher>;

    authRepository = {
      generateToken: jest.fn(),
    } as jest.Mocked<IAuthRepository>;

    // Instanciar servicio con mocks
    loginUseCase = new LoginUseCase(
      userRepository,
      passwordHasher,
      authRepository,
    );
  });

  const mockUser = new User(
    Email.create('test@example.com'),
    'Test User',
    Password.fromHashed('test123'),
    UserStatus.active(),
  );

  const loginDto = {
        email: 'test@example.com',
        password: 'test123',
      };

  describe('login', () => {
    it('Should return a token when user is authenticated', async () => {


      (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (passwordHasher.compare as jest.Mock).mockResolvedValue(true);
      (authRepository.generateToken as jest.Mock).mockResolvedValue(
        'mock-token',
      );

      const result = await loginUseCase.execute(loginDto);

      expect(result).toEqual({
        accessToken: 'mock-token',
        user: {
          email: mockUser.email.getValue(),
          name: 'Test User',
        },
      });
      expect(userRepository.findByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(passwordHasher.compare).toHaveBeenCalledWith(
        mockUser.password.getValue(),
        mockUser.password.getValue(),
      );
      expect(authRepository.generateToken).toHaveBeenCalledWith('mock-token');
    });

    it('Should throw an error when user is not found', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      await expect(
        loginUseCase.execute({
          email: 'nonexistent@example.com',
          password: 'password',
        }),
      ).rejects.toThrow(InvalidCredentialsException);

      expect(passwordHasher.compare).not.toHaveBeenCalled();
      expect(authRepository.generateToken).not.toHaveBeenCalled();
    });

    it('Should throw an error when password is incorrect', async () => {
      
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (passwordHasher.compare as jest.Mock).mockResolvedValue(false);
      await expect(loginUseCase.execute(loginDto)).rejects.toThrow(
        InvalidCredentialsException,
      );

      expect(authRepository.generateToken).not.toHaveBeenCalled();
    });
  });
});
