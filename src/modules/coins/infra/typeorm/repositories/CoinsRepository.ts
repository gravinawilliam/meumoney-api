import ICreateCoinDTO from '@modules/coins/interfaces/dtos/ICreateCoinDTO';
import ICoin from '@modules/coins/interfaces/models/ICoin';
import ICoinsRepository from '@modules/coins/interfaces/repositories/ICoinsRepository';
import { getRepository, Repository } from 'typeorm';
import Coin from '../entities/Coin';

export default class CoinsRepository implements ICoinsRepository {
  private ormRepository: Repository<ICoin>;

  constructor() {
    this.ormRepository = getRepository(Coin);
  }

  public async create(coin: ICreateCoinDTO): Promise<ICoin> {
    const coinCreated = this.ormRepository.create(coin);
    await this.ormRepository.save(coinCreated);
    return coinCreated;
  }
}
