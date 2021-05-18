import ICreateBankAccountDTO from '../dtos/ICreateBankAccountDTO';
import IBankAccount from '../models/IBankAccount';

export default interface IBankAccountsRepository {
  create(bankAccount: ICreateBankAccountDTO): Promise<IBankAccount>;
  findByUserId(userId: string): Promise<IBankAccount[]>;
  findById(id: string): Promise<IBankAccount | undefined>;
  save(bankAccount: IBankAccount): Promise<IBankAccount>;
}
