import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      'a7e071b3de48cec1dd24de6cbe6c7bf1',
    ) as IPayload;

    const usersReposiotry = new UsersRepository();

    const user = await usersReposiotry.findById(user_id);

    if (!user) {
      throw new Error('User does not exists');
    }

    next();
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export { ensureAuthenticate };
