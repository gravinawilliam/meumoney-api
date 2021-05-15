import ICreateCoinDTO from '../dtos/ICreateCoinDTO';
import ICoin from '../models/ICoin';

export default interface ICoinsRepository {
  create(coin: ICreateCoinDTO): Promise<ICoin>;
  findNineCoins(): Promise<ICoin[]>;
  findByName(name: string): Promise<ICoin | undefined>;
  findBySymbol(symbol: string): Promise<ICoin | undefined>;
  save(coin: ICoin): Promise<ICoin>;
}
