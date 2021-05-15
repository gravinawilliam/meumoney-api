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

  public async findByName(name: string): Promise<ICoin | undefined> {
    const foundCoin = await this.ormRepository.findOne({
      where: {
        name,
      },
      order: {
        createdAt: `DESC`,
      },
    });
    return foundCoin;
  }

  public async findBySymbol(symbol: string): Promise<ICoin | undefined> {
    const foundCoin = await this.ormRepository.findOne({
      where: {
        symbol,
      },
    });
    return foundCoin;
  }

  public async findCoins(amountCoins: number): Promise<ICoin[]> {
    const foundCoin = await this.ormRepository.find({
      order: {
        createdAt: `DESC`,
      },
      take: amountCoins,
    });
    return foundCoin;
  }

  public async save(coin: ICoin): Promise<ICoin> {
    await this.ormRepository.save(coin);
    return coin;
  }
}
