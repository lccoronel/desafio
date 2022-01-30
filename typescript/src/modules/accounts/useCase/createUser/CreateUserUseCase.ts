import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersReposiotry } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersReposiotry,
  ) {}

  async execute({ name, email, password, driver_license }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.filterByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User Already exists');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
