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

  public async findById(id: string): Promise<IBankAccount | undefined> {
    const foundBankAccount = await this.ormRepository.findOne(id);
    return foundBankAccount;
  }

  public async findByUserId(userId: string): Promise<IBankAccount[]> {
    const bankAccounts = this.ormRepository.find({
      where: {
        userId,
      },
    });
    return bankAccounts;
  }

  public async save(bankAccount: IBankAccount): Promise<IBankAccount> {
    await this.ormRepository.save(bankAccount);
    return bankAccount;
  }
}
