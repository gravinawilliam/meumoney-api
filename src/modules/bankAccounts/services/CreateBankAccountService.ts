import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import { NOT_FOUND } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateBankAccountDTO from '../interfaces/dtos/ICreateBankAccountDTO';
import IBankAccount from '../interfaces/models/IBankAccount';
import IBankAccountsRepository from '../interfaces/repositories/IBankAccountsRepository';

@injectable()
export default class CreateBankAccountService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', NOT_FOUND);
    }

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
