import ICreateBankDTO from '../dtos/ICreateBankDTO';
import IBank from '../models/IBank';

export default interface IBanksRepository {
  create(bank: ICreateBankDTO): Promise<IBank>;
}