import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '@modules/users/interfaces/dtos/ICreateUserDTO';
import IUser from '@modules/users/interfaces/models/IUser';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<IUser> {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });
    return user;
  }
}
