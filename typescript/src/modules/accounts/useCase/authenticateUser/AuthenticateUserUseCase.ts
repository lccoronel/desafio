import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersReposiotry } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersReposiotry: IUsersReposiotry,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersReposiotry.filterByEmail(email);

    if (!user) throw new AppError('Email or password incorrect');

    const passswordMatch = await compare(password, user.password);

    if (!passswordMatch) throw new AppError('Email or password incorrect');

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email: user.email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date_refresh_token_date = this.dateProvider.addDyas(auth.expires_refresh_token_days);

    await this.usersTokenRepository.create({
      user_id: user.id,
      expires_date: expires_date_refresh_token_date,
      refresh_token,
    });

    const response: IResponse = {
      user: { email: user.email, name: user.name },
      token,
      refresh_token,
    };

    return response;
  }
}
