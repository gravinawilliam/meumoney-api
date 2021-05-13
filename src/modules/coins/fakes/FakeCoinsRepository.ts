import { v4 } from 'uuid';
import Coin from '../infra/typeorm/entities/Coin';
import ICreateCoinDTO from '../interfaces/dtos/ICreateCoinDTO';
import ICoin from '../interfaces/models/ICoin';
import ICoinsRepository from '../interfaces/repositories/ICoinsRepository';

export default class FakeCoinsRepository implements ICoinsRepository {
  private coins: ICoin[] = [];

  public async create(coin: ICreateCoinDTO): Promise<ICoin> {
    const coinCreated = Object.assign(new Coin(), {
      id: v4(),
      ...coin,
    });
    this.coins.push(coinCreated);
    return coinCreated;
  }
}
