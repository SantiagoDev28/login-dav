import { IUserRepository } from './domain/repositories/user.repository';
import { IPasswordHasher } from './domain/repositories/password-hasher.interface';
import { UserMockRepository } from './infrastructure/repositories/user-mock.repository';
import { LoginUseCase } from './application/use-cases/auth/login';
import { InvalidCredentialsException } from './domain/exceptions';
import { access } from 'fs';

describe('LoginUseCase', () => {
    let userRepository: IUserRepository;
    let passwordHasher: IPasswordHasher;
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
            generateToken: jest.fn(),
        } as jest.Mocked<IPasswordHasher>;

        // Instanciar servicio con mocks
        loginUseCase = new LoginUseCase(userRepository, passwordHasher);

    })

    describe('login', () => {
        it('Should return a token when user is authenticated', async () => {
            const mockUser = {
                email: 'test@example.com',
                name: 'Test User',
                password: 'hashedPassword',
            };

            (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
            (passwordHasher.compare as jest.Mock).mockResolvedValue(true);
            (passwordHasher.generateToken as jest.Mock).mockResolvedValue('mock-token');

            const result = await loginUseCase.execute(mockUser);

            expect(result).toEqual({
                accessToken: 'mock-token',
                user: {
                    email: mockUser.email,
                    name: "Test User",
                },
            });
            expect(userRepository.findByEmail).toHaveBeenCalledWith(mockUser.email);
            expect(passwordHasher.compare).toHaveBeenCalledWith(mockUser.password, mockUser.password);
            expect(passwordHasher.generateToken).toHaveBeenCalledWith('mock-token');
        });

        it('Should throw an error when user is not found', async () => {
            (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
            await expect(loginUseCase.execute({ email: 'nonexistent@example.com', password: 'password' })).rejects.toThrow(InvalidCredentialsException);

            expect(passwordHasher.compare).not.toHaveBeenCalled();
            expect(passwordHasher.generateToken).not.toHaveBeenCalled();
        });

        it('Should throw an error when password is incorrect', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'hashedPassword',
            };
            (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
            (passwordHasher.compare as jest.Mock).mockResolvedValue(false);
            await expect(loginUseCase.execute(mockUser)).rejects.toThrow(InvalidCredentialsException);

            expect(passwordHasher.generateToken).not.toHaveBeenCalled();
    });
    });
});