import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IUser from '@modules/users/interfaces/models/IUser';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { NOT_FOUND } from '@shared/constants/HttpStatusCode';
import IShowProfileDTO from '../interfaces/dtos/IShowProfileDTO';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IShowProfileDTO): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.', NOT_FOUND);
    }
    return user;
  }
}
