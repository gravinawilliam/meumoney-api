import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import { CONFLICT, NOT_FOUND } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
import IBankAccountsRepository from '@modules/bankAccounts/interfaces/repositories/IBankAccountsRepository';
import IAntiFraudProvider from '@shared/container/providers/AntiFraudProvider/interfaces/IAntiFraudProvider';
import ITransactionsRepository from '../interfaces/repositories/ITransactionsRepository';
import ITransaction from '../interfaces/models/ITransaction';
import IUpdateTransactionDTO from '../interfaces/dtos/IUpdateTransactionDTO';

@injectable()
export default class UpdateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
    @inject('AntiFraudProvider')
    private antiFraudProvider: IAntiFraudProvider,
  ) {}

  public async execute({
    userId,
    date,
    fromBankAccountId,
    note,
    symbolCoin,
    title,
    transactionId,
    transactionType,
    value,
    toBankAccountId,
  }: IUpdateTransactionDTO): Promise<ITransaction> {
    const transaction = await this.transactionsRepository.findById(
      transactionId,
    );

    if (!transaction) {
      throw new AppError('Transaction not found', NOT_FOUND);
    }

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
    if (toBankAccountId != null && transactionType === 'transfer') {
      toBankAccount = await this.bankAccountsRepository.findById(
        toBankAccountId,
      );
    }
    if (
      !toBankAccount &&
      toBankAccountId != null &&
      transactionType === 'transfer'
    ) {
      throw new AppError('Bank Account not found', NOT_FOUND);
    }

    switch (transactionType) {
      case 'expense':
        fromBankAccount.balance += transaction.value;
        fromBankAccount.balance -= value;
        break;

      case 'gain':
        fromBankAccount.balance -= transaction.value;
        fromBankAccount.balance += value;
        break;

      case 'transfer':
        if (toBankAccount) {
          fromBankAccount.balance += transaction.value;
          fromBankAccount.balance -= value;
          toBankAccount.balance -= transaction.value;
          toBankAccount.balance += value;
        } else {
          throw new AppError('To bank account not found', NOT_FOUND);
        }
        break;

      default:
        throw new AppError(`Incorrect transaction type: ${transactionType}`);
    }

    await this.bankAccountsRepository.save(fromBankAccount);
    if (toBankAccount && transaction.transactionType === 'transfer') {
      await this.bankAccountsRepository.save(toBankAccount);
    }

    transaction.fromBankAccountId = fromBankAccountId;
    transaction.transactionType = transactionType;
    transaction.note = note;
    transaction.title = title;
    transaction.userId = userId;
    transaction.value = value;
    transaction.symbolCoin = symbolCoin;
    transaction.toBankAccountId = toBankAccountId || null;
    transaction.date = date;

    await this.antiFraudProvider.benford(transaction);

    await this.transactionsRepository.save(transaction);

    return transaction;
  }
}
