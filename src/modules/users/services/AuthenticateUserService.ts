import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth.config';
import IHashProvider from '@shared/container/providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IAuthenticateUserDTO from '../interfaces/dtos/IAuthenticateUserDTO';
import IResponseAuthenticateUserDTO from '../interfaces/dtos/IResponseAuthenticateUserDTO';

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    password,
    email,
  }: IAuthenticateUserDTO): Promise<IResponseAuthenticateUserDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
