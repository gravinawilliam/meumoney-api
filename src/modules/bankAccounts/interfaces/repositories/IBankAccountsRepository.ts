import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';
import IBankAccount from '../models/IBankAccount';

export default interface IBankAccountsRepository {
  create(bankAccount: ICreateBankAccountDTO): Promise<IBankAccount>;
  delete(bankAccount: IBankAccount): Promise<void>;
  findById(id: string): Promise<IBankAccount | undefined>;
  findByUserId(userId: string): Promise<IBankAccount[]>;
  save(bankAccount: IBankAccount): Promise<IBankAccount>;
}
