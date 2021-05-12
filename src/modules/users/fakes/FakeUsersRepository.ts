import ICreateUserDTO from '@modules/users/interfaces/dtos/ICreateUserDTO';
import IUser from '@modules/users/interfaces/models/IUser';
import { v4 } from 'uuid';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async create(user: ICreateUserDTO): Promise<IUser> {
    const userCreated = Object.assign(new User(), {
      id: v4(),
      ...user,
    });
    this.users.push(userCreated);
    return userCreated;
  }
}