import { getRepository, Repository } from 'typeorm';
import ITransactionsRepository from '@modules/transactions/interfaces/repositories/ITransactionsRepository';
import ITransaction from '@modules/transactions/interfaces/models/ITransaction';
import Transaction from '../entities/Transaction';
import ICreateTransactionDTO from '../../../interfaces/dtos/ICreateTransactionDTO';

export default class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<ITransaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(
    transaction: ICreateTransactionDTO,
  ): Promise<ITransaction> {
    const transactionCreated = this.ormRepository.create(transaction);
    await this.ormRepository.save(transactionCreated);
    return transactionCreated;
  }
}
