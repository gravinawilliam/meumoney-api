import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ITransaction from '../models/ITransaction';

export default interface ITransactionsRepository {
  create(transaction: ICreateTransactionDTO): Promise<ITransaction>;
}
