import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

export interface IUsersTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(userId: string, refresh_token: string): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken>;
}
