import ICreateCoinDTO from '../dtos/ICreateCoinDTO';
import ICoin from '../models/ICoin';

export default interface ICoinsRepository {
  create(coin: ICreateCoinDTO): Promise<ICoin>;
}
