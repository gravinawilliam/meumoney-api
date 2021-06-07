import { NOT_FOUND, UNAUTHORIZED } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDeleteBankAccountDTO from '../interfaces/dtos/IDeleteBankAccountDTO';
import IBankAccount from '../interfaces/models/IBankAccount';
import IBankAccountsRepository from '../interfaces/repositories/IBankAccountsRepository';

@injectable()
export default class DeleteBankAccountService {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  public async execute({
    userId,
    bankAccountId,
  }: IDeleteBankAccountDTO): Promise<IBankAccount> {
    const bankAccount = await this.bankAccountsRepository.findById(
      bankAccountId,
    );
    if (!bankAccount) {
      throw new AppError('Bank Account not found.', NOT_FOUND);
    }
    if (userId !== bankAccount.userId) {
      throw new AppError(
        'This bank account does not belong to this user informed',
        UNAUTHORIZED,
      );
    }
    await this.bankAccountsRepository.delete(bankAccount);
    return bankAccount;
  }
}
