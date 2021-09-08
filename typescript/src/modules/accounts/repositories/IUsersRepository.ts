import { ICreateUsersDTO } from '../dtos/ICreateUserDTO';

interface IUsersReposiotry {
  create(data: ICreateUsersDTO): Promise<void>;
}

export { IUsersReposiotry };
