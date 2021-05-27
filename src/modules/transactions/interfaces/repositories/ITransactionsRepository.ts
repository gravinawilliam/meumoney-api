import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IListTransactionByDateUserIdDTO from '../dtos/IListTransactionByDateUserIdDTO';
import ITransaction from '../models/ITransaction';

export default interface ITransactionsRepository {
  create(transaction: ICreateTransactionDTO): Promise<ITransaction>;
  findByDateUserId({
    date,
    userId,
  }: IListTransactionByDateUserIdDTO): Promise<ITransaction[]>;
}
