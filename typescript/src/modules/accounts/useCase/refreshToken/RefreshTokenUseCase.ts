import { inject, injectable } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';

import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const decode = verify(token, auth.secret_refresh_token) as IPayload;

    const userId = decode.sub;
    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(userId, token);

    if (!userToken) throw new AppError('Refresh does not exists');

    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email: decode.email }, auth.secret_refresh_token, {
      subject: decode.sub,
      expiresIn: auth.expires_in_refresh_token,
    });
    const expires_date = this.dateProvider.addDyas(auth.expires_refresh_token_days);
    await this.usersTokenRepository.create({ user_id: userId, refresh_token, expires_date });

    return refresh_token;
  }
}
