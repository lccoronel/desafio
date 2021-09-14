import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersReposiotry } from '../../repositories/IUsersRepository';

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
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersReposiotry: IUsersReposiotry,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersReposiotry.filterByEmail(email);

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    const passswordMatch = await compare(password, user.password);

    if (!passswordMatch) {
      throw new Error('Email or password incorrect');
    }

    const token = sign({}, 'a7e071b3de48cec1dd24de6cbe6c7bf1', {
      subject: user.id,
      expiresIn: '1d',
    });

    const response: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };

    return response;
  }
}

export { AuthenticateUserUseCase };
