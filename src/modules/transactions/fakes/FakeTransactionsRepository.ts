import { getDay, getMonth, getYear } from 'date-fns';
import { v4 } from 'uuid';
import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '../interfaces/dtos/ICreateTransactionDTO';
import IDeleteTransactionDTO from '../interfaces/dtos/IDeleteTransactionDTO';
import IListTransactionByDateBankAccountIdDTO from '../interfaces/dtos/IListTransactionByDateBankAccountIdDTO';
import IListTransactionByDateUserIdDTO from '../interfaces/dtos/IListTransactionByDateUserIdDTO';
import IListTransactionsByBankAccountIdDTO from '../interfaces/dtos/IListTransactionsByBankAccountIdDTO';
import ITransaction from '../interfaces/models/ITransaction';
import ITransactionsRepository from '../interfaces/repositories/ITransactionsRepository';

export default class FakeTransactionsRepository
  implements ITransactionsRepository
{
  private transactions: ITransaction[] = [];

  public async create(
    transaction: ICreateTransactionDTO,
  ): Promise<ITransaction> {
    const transactionCreated = Object.assign(new Transaction(), {
      id: v4(),
      ...transaction,
    });
    return transactionCreated;
  }

  public async findByBankAccount({
    bankAccountId,
    userId,
  }: IListTransactionsByBankAccountIdDTO): Promise<ITransaction[]> {
    const foundTransactions = this.transactions.filter(transaction => {
      return (
        transaction.userId === userId &&
        transaction.fromBankAccountId === bankAccountId
      );
    });
    return foundTransactions;
  }

  public async delete(transaction: ITransaction): Promise<ITransaction> {
    const findIndex = this.transactions.findIndex(i => i.id === transaction.id);
    const deletedTransaction = this.transactions[findIndex];
    this.transactions.splice(findIndex, 1);
    return deletedTransaction;
  }

  public async findByDateBankAccountId({
    userId,
  }: IListTransactionByDateBankAccountIdDTO): Promise<ITransaction[]> {
    const foundTransactions = this.transactions.filter(transaction => {
      return transaction.userId === userId;
    });
    return foundTransactions;
  }

  public async findByDateUserId({
    date,
    userId,
  }: IListTransactionByDateUserIdDTO): Promise<ITransaction[]> {
    const newDate = new Date(date);
    const foundTransactions = this.transactions.filter(transaction => {
      return (
        transaction.userId === userId &&
        getDay(transaction.date) === getDay(newDate) + 1 &&
        getMonth(transaction.date) === getMonth(newDate) &&
        getYear(transaction.date) === getYear(newDate)
      );
    });
    return foundTransactions;
  }

  public async findById(
    transactionId: string,
  ): Promise<ITransaction | undefined> {
    const foundTransaction = this.transactions.find(
      transaction => transaction.id === transactionId,
    );
    return foundTransaction;
  }

  public async findByTransactionIdUserId({
    transactionId,
    userId,
  }: IDeleteTransactionDTO): Promise<ITransaction | undefined> {
    const foundTransaction = this.transactions.find(
      transaction =>
        transaction.id === transactionId && transaction.userId === userId,
    );
    return foundTransaction;
  }

  public async findByUserId(userId: string): Promise<ITransaction[]> {
    const foundTransactions = this.transactions.filter(transaction => {
      return transaction.userId === userId;
    });
    return foundTransactions;
  }

  public async save(transaction: ITransaction): Promise<void> {
    this.transactions.push(transaction);
  }
}
