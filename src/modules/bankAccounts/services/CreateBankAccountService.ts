import { inject, injectable } from 'tsyringe';
import ICreateBankAccountDTO from '../interfaces/dtos/ICreateBankAccountDTO';
import IBankAccount from '../interfaces/models/IBankAccount';
import IBankAccountsRepository from '../interfaces/repositories/IBankAccountsRepository';

@injectable()
export default class CreateBankAccountService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  public async execute({
    accountNumbers,
    balance,
    cardholderName,
    userId,
    bankId,
    monthValidity,
    symbolCoin,
    yearValidity,
  }: ICreateBankAccountDTO): Promise<IBankAccount> {
    const bankAccount = await this.bankAccountsRepository.create({
      accountNumbers,
      balance,
      bankId,
      cardholderName,
      monthValidity,
      symbolCoin,
      userId,
      yearValidity,
    });
    return bankAccount;
  }
}
