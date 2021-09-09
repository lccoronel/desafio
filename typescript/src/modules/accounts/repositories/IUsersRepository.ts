import { ICreateUsersDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersReposiotry {
  create(data: ICreateUsersDTO): Promise<void>;
  filterByEmail(email: string): Promise<User | null>;
}

export { IUsersReposiotry };
