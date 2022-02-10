import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersReposiotry } from '@modules/accounts/repositories/IUsersRepository';

export class UsersRepository implements IUsersReposiotry {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, driver_license, password, avatar, id, is_admin }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
      is_admin,
    });

    await this.repository.save(user);
  }

  async filterByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}
