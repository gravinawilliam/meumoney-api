import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IDeleteTransactionDTO from '../dtos/IDeleteTransactionDTO';
import IListTransactionByDateBankAccountIdDTO from '../dtos/IListTransactionByDateBankAccountIdDTO';
import IListTransactionByDateUserIdDTO from '../dtos/IListTransactionByDateUserIdDTO';
import IListTransactionsByBankAccountIdDTO from '../dtos/IListTransactionsByBankAccountIdDTO';
import ITransaction from '../models/ITransaction';

export default interface ITransactionsRepository {
  create(transaction: ICreateTransactionDTO): Promise<ITransaction>;
  delete(transaction: ITransaction): Promise<ITransaction>;
  findByBankAccount({
    bankAccountId,
    userId,
  }: IListTransactionsByBankAccountIdDTO): Promise<ITransaction[]>;
  findByDateUserId({
    date,
    userId,
  }: IListTransactionByDateUserIdDTO): Promise<ITransaction[]>;
  findByDateBankAccountId({
    month,
    userId,
    year,
  }: IListTransactionByDateBankAccountIdDTO): Promise<ITransaction[]>;
  findByTransactionIdUserId({
    transactionId,
    userId,
  }: IDeleteTransactionDTO): Promise<ITransaction | undefined>;
  findByUserId(userId: string): Promise<ITransaction[]>;
  findById(transactionId: string): Promise<ITransaction | undefined>;
  save(transaction: ITransaction): Promise<void>;
}
