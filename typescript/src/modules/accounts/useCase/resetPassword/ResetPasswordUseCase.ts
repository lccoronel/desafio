import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { IUsersReposiotry } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersReposiotry,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) throw new AppError('Invalid token!');

    if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError('Expired Token!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.usersTokenRepository.deleteById(userToken.id);
  }
}
