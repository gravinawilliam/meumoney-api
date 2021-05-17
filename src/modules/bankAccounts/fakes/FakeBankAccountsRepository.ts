import { v4 } from 'uuid';
import BankAccount from '../infra/typeorm/entities/BankAccount';
import ICreateBankAccountDTO from '../interfaces/dtos/ICreateBankAccountDTO';
import IBankAccount from '../interfaces/models/IBankAccount';
import IBankAccountsRepository from '../interfaces/repositories/IBankAccountsRepository';

export default class FakeBankAccountsRepository
  implements IBankAccountsRepository
{
  private bankAccounts: IBankAccount[] = [];

  public async create(
    bankAccount: ICreateBankAccountDTO,
  ): Promise<IBankAccount> {
    const bankCreated = Object.assign(new BankAccount(), {
      id: v4(),
      ...bankAccount,
    });
    this.bankAccounts.push(bankCreated);
    return bankCreated;
  }

  public async findByUserId(userId: string): Promise<IBankAccount[]> {
    const bankAccounts = this.bankAccounts.filter(bankAccount => {
      return bankAccount.userId === userId;
    });
    return bankAccounts;
  }
}
