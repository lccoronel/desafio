import { ICreateUsersDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersReposiotry {
  create(data: ICreateUsersDTO): Promise<void>;
  filterByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
