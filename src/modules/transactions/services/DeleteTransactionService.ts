import { inject, injectable } from 'tsyringe';
import { NOT_FOUND } from '@shared/constants/HttpStatusCode';
import IBankAccountsRepository from '@modules/bankAccounts/interfaces/repositories/IBankAccountsRepository';
import AppError from '../../../shared/errors/AppError';
import ITransactionsRepository from '../interfaces/repositories/ITransactionsRepository';
import ITransaction from '../interfaces/models/ITransaction';
import IDeleteTransactionDTO from '../interfaces/dtos/IDeleteTransactionDTO';

@injectable()
export default class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  public async execute({
    transactionId,
    userId,
  }: IDeleteTransactionDTO): Promise<ITransaction> {
    const transaction =
      await this.transactionsRepository.findByTransactionIdUserId({
        transactionId,
        userId,
      });
    if (!transaction) {
      throw new AppError('Transaction not found.', NOT_FOUND);
    }

    const deletedTransaction = await this.transactionsRepository.delete(
      transaction,
    );

    const fromBankAccount = await this.bankAccountsRepository.findById(
      transaction.fromBankAccountId,
    );
    if (!fromBankAccount) {
      throw new AppError('Bank Account not found.', NOT_FOUND);
    }

    let toBankAccount;
    if (transaction.toBankAccountId) {
      toBankAccount = await this.bankAccountsRepository.findById(
        transaction.toBankAccountId,
      );
      if (!toBankAccount) {
        throw new AppError('Bank Account not found.', NOT_FOUND);
      }
    }

    switch (transaction.transactionType) {
      case 'gain':
        fromBankAccount.balance -= transaction.value;
        break;
      case 'expense':
        fromBankAccount.balance += transaction.value;
        break;
      case 'transfer':
        if (toBankAccount) {
          fromBankAccount.balance += transaction.value;
          toBankAccount.balance -= transaction.value;
        } else {
          throw new AppError('To bank account not found', NOT_FOUND);
        }
        break;
      default:
        throw new AppError(
          `Incorrect transaction type: ${transaction.transactionType}`,
        );
    }

    await this.bankAccountsRepository.save(fromBankAccount);
    if (toBankAccount) {
      await this.bankAccountsRepository.save(toBankAccount);
    }
    return deletedTransaction;
  }
}
