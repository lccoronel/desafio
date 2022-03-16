import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRespositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCase/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepositoryInMemory: UsersTokenRespositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Autenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRespositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('shoulde be able to authenticate an user', async () => {
    const user: ICreateUsersDTO = {
      driver_license: '000123',
      name: 'Test User',
      email: 'test@example.com',
      password: '123',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: 'false@email.com', password: '123' });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        driver_license: '000123',
        name: 'Password Error',
        email: 'test@example.com',
        password: '123',
      };

      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({ email: user.email, password: 'incorretPassword' });
    }).rejects.toBeInstanceOf(AppError);
  });
});
