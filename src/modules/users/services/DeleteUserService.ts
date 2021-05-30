import { inject, injectable } from 'tsyringe';
import IUser from '@modules/users/interfaces/models/IUser';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { NOT_FOUND, UNAUTHORIZED } from '@shared/constants/HttpStatusCode';
import IHashProvider from '@shared/container/providers/HashProvider/interfaces/IHashProvider';
import IDeleteUserDTO from '../interfaces/dtos/IDeleteUserDTO';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ userId, password }: IDeleteUserDTO): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.', NOT_FOUND);
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('Combination password incorret', UNAUTHORIZED);
    }
    const deletedUser = await this.usersRepository.delete(user);
    return deletedUser;
  }
}
