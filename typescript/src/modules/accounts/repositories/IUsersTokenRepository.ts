import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserTokens';

export interface IUsersTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
}
