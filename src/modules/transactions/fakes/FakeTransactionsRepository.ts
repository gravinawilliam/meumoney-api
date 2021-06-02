import { getDay, getMonth, getYear } from 'date-fns';
import { v4 } from 'uuid';
import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '../interfaces/dtos/ICreateTransactionDTO';
import IDeleteTransactionDTO from '../interfaces/dtos/IDeleteTransactionDTO';
import IListTransactionByDateUserIdDTO from '../interfaces/dtos/IListTransactionByDateUserIdDTO';
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
    this.transactions.push(transactionCreated);
    return transactionCreated;
  }

  public async delete(transaction: ITransaction): Promise<ITransaction> {
    const findIndex = this.transactions.findIndex(i => i.id === transaction.id);
    const deletedTransaction = this.transactions[findIndex];
    this.transactions.splice(findIndex, 1);
    return deletedTransaction;
  }

  public async findByDateUserId({
    date,
    userId,
  }: IListTransactionByDateUserIdDTO): Promise<ITransaction[]> {
    const newDate = new Date(date);
    const transactions = this.transactions.filter(transaction => {
      return (
        transaction.userId === userId &&
        getDay(transaction.date) === getDay(newDate) + 1 &&
        getMonth(transaction.date) === getMonth(newDate) &&
        getYear(transaction.date) === getYear(newDate)
      );
    });
    return transactions;
  }

  public async findByTransactionIdUserId({
    transactionId,
    userId,
  }: IDeleteTransactionDTO): Promise<ITransaction | undefined> {
    const foundBankAccount = this.transactions.find(
      transaction =>
        transaction.id === transactionId && transaction.userId === userId,
    );
    return foundBankAccount;
  }
}
