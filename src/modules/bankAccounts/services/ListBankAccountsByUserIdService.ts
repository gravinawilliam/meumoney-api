import { inject, injectable } from 'tsyringe';
import IListBankAccountsByUserIdDTO from '../interfaces/dtos/IListBankAccountsByUserIdDTO';
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
  }: IListBankAccountsByUserIdDTO): Promise<IBankAccount[]> {
    const bankAccounts = await this.bankAccountsRepository.findByUserId(userId);
    return bankAccounts;
  }
}
