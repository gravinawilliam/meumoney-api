import ICreateBankAccountDTO from '@modules/bankAccounts/interfaces/dtos/ICreateBankAccountDTO';
import IBankAccount from '@modules/bankAccounts/interfaces/models/IBankAccount';
import IBankAccountsRepository from '@modules/bankAccounts/interfaces/repositories/IBankAccountsRepository';
import { getRepository, Repository } from 'typeorm';
import BankAccount from '../entities/BankAccount';

export default class BankAccountsRepository implements IBankAccountsRepository {
  private ormRepository: Repository<IBankAccount>;

  constructor() {
    this.ormRepository = getRepository(BankAccount);
  }

  public async create(
    bankAccount: ICreateBankAccountDTO,
  ): Promise<IBankAccount> {
    const bankAccountCreated = this.ormRepository.create(bankAccount);
    await this.ormRepository.save(bankAccountCreated);
    return bankAccountCreated;
  }
}
