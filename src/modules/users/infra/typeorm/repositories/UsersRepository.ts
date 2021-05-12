import ICreateUserDTO from '@modules/users/interfaces/dtos/ICreateUserDTO';
import IUser from '@modules/users/interfaces/models/IUser';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<IUser>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(user: ICreateUserDTO): Promise<IUser> {
    const userCreated = this.ormRepository.create(user);
    await this.ormRepository.save(userCreated);
    return userCreated;
  }
}