import ICreateBankDTO from '../dtos/ICreateBankDTO';
import IBank from '../models/IBank';

export default interface IBanksRepository {
  create(bank: ICreateBankDTO): Promise<IBank>;
  findAll(): Promise<IBank[]>;
  findById(id: string): Promise<IBank | undefined>;
  findByName(name: string): Promise<IBank | undefined>;
}
