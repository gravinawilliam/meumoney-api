import ICreateUserTokenDTO from '@modules/users/interfaces/dtos/ICreateUserTokenDTO';
import IFindUserTokenDTO from '@modules/users/interfaces/dtos/IFindUserTokenDTO';
import IUserToken from '@modules/users/interfaces/models/IUserToken';
import IUserTokensRepository from '@modules/users/interfaces/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<IUserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findUserToken({
    email,
    token,
  }: IFindUserTokenDTO): Promise<IUserToken | undefined> {
    const foundToken = this.ormRepository.findOne({
      where: {
        email,
        token,
      },
    });
    return foundToken;
  }

  public async findByEmail(email: string): Promise<IUserToken | undefined> {
    const foundToken = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return foundToken;
  }

  public async create(userToken: ICreateUserTokenDTO): Promise<IUserToken> {
    const userTokenCreated = this.ormRepository.create(userToken);
    await this.ormRepository.save(userTokenCreated);
    return userTokenCreated;
  }

  public async save(userToken: IUserToken): Promise<IUserToken> {
    await this.ormRepository.save(userToken);
    return userToken;
  }
}
