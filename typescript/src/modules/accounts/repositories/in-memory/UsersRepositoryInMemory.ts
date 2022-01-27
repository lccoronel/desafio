import { ICreateUsersDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersReposiotry } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersReposiotry {
  users: User[] = [];

  async create({ driver_license, name, email, password }: ICreateUsersDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { driver_license, name, email, password });

    this.users.push(user);
  }

  async filterByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}
