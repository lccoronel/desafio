import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { IUsersReposiotry } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/IDateProvider';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersReposiotry,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.filterByEmail(email);

    if (!user) throw new AppError('User does not exists');

    const token = uuidv4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
  }
}
