import { inject, injectable } from 'tsyringe';
import ICreateBankAccountDTO from '../interfaces/dtos/ICreateBankAccountDTO';
import IBankAccount from '../interfaces/models/IBankAccount';
import IBankAccountsRepository from '../interfaces/repositories/IBankAccountsRepository';

@injectable()
export default class ListBankAccountsByUserIdService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  public async execute({
    userId,
  }: ICreateBankAccountDTO): Promise<IBankAccount[]> {
    const bankAccounts = await this.bankAccountsRepository.findByUserId(userId);
    return bankAccounts;
  }
}
