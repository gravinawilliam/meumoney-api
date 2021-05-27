import { inject, injectable } from 'tsyringe';
import { CONFLICT, NOT_FOUND } from '@shared/constants/HttpStatusCode';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import IBankAccountsRepository from '@modules/bankAccounts/interfaces/repositories/IBankAccountsRepository';
import AppError from '../../../shared/errors/AppError';
import ICreateTransactionDTO from '../interfaces/dtos/ICreateTransactionDTO';
import ITransactionsRepository from '../interfaces/repositories/ITransactionsRepository';
import ITransaction from '../interfaces/models/ITransaction';

@injectable()
export default class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  public async execute({
    note,
    title,
    transactionType,
    value,
    userId,
    date,
    symbolCoin,
    fromBankAccountId,
    toBankAccountId,
  }: ICreateTransactionDTO): Promise<ITransaction> {
    if (value < 0) {
      throw new AppError('Can not negative values', CONFLICT);
    }

    const checkUserExists = await this.usersRepository.findById(userId);
    if (!checkUserExists) {
      throw new AppError('User not found', NOT_FOUND);
    }

    const fromBankAccount = await this.bankAccountsRepository.findById(
      fromBankAccountId,
    );
    if (!fromBankAccount) {
      throw new AppError('From Bank Account  not found', NOT_FOUND);
    }

    let toBankAccount;
    if (toBankAccountId != null) {
      toBankAccount = await this.bankAccountsRepository.findById(
        toBankAccountId,
      );
    }
    if (!toBankAccount && toBankAccountId != null) {
      throw new AppError('Bank Account not found', NOT_FOUND);
    }

    switch (transactionType) {
      case 'expense':
        fromBankAccount.balance -= value;
        break;

      case 'gain':
        fromBankAccount.balance += value;
        break;

      case 'transfer':
        if (toBankAccount) {
          fromBankAccount.balance -= value;
          toBankAccount.balance += value;
        }
        break;

      default:
        throw new AppError(`Tipo de transação incorreto: ${transactionType}`);
    }

    try {
      await this.bankAccountsRepository.save(fromBankAccount);
      if (toBankAccount) {
        await this.bankAccountsRepository.save(toBankAccount);
      }
    } catch (error) {
      throw new AppError(
        `Erro ao salvar o valor da transferencia na conta error: ${error}`,
      );
    }

    const transaction = await this.transactionsRepository.create({
      transactionType,
      note,
      title,
      userId,
      value,
      fromBankAccountId,
      symbolCoin,
      toBankAccountId,
      date,
    });

    return transaction;
  }
}
