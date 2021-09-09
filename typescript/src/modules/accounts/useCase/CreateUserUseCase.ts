import { inject, injectable } from 'tsyringe';

import { ICreateUsersDTO } from '../dtos/ICreateUserDTO';
import { IUsersReposiotry } from '../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersReposiotry,
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      email,
      password,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
