import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IDeleteTransactionDTO from '../dtos/IDeleteTransactionDTO';
import IListTransactionByDateUserIdDTO from '../dtos/IListTransactionByDateUserIdDTO';
import ITransaction from '../models/ITransaction';

export default interface ITransactionsRepository {
  create(transaction: ICreateTransactionDTO): Promise<ITransaction>;
  findByDateUserId({
    date,
    userId,
  }: IListTransactionByDateUserIdDTO): Promise<ITransaction[]>;
  findByTransactionIdUserId({
    transactionId,
    userId,
  }: IDeleteTransactionDTO): Promise<ITransaction | undefined>;
  delete(transaction: ITransaction): Promise<ITransaction>;
}
