import { getRepository, Raw, Repository } from 'typeorm';
import ITransactionsRepository from '@modules/transactions/interfaces/repositories/ITransactionsRepository';
import ITransaction from '@modules/transactions/interfaces/models/ITransaction';
import IListTransactionByDateUserIdDTO from '@modules/transactions/interfaces/dtos/IListTransactionByDateUserIdDTO';
import IDeleteTransactionDTO from '@modules/transactions/interfaces/dtos/IDeleteTransactionDTO';
import IListTransactionByDateBankAccountIdDTO from '@modules/transactions/interfaces/dtos/IListTransactionByDateBankAccountIdDTO';
import IListTransactionsByBankAccountIdDTO from '@modules/transactions/interfaces/dtos/IListTransactionsByBankAccountIdDTO';
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
    return transactionCreated;
  }

  public async delete(transaction: ITransaction): Promise<ITransaction> {
    const deletedTransaction = await this.ormRepository.remove(transaction);
    return deletedTransaction;
  }

  public async findByBankAccount({
    bankAccountId,
    userId,
  }: IListTransactionsByBankAccountIdDTO): Promise<ITransaction[]> {
    const transactions = await this.ormRepository.find({
      where: {
        fromBankAccountId: bankAccountId,
        userId,
      },
    });
    return transactions;
  }

  public async findByDateUserId({
    date,
    userId,
  }: IListTransactionByDateUserIdDTO): Promise<ITransaction[]> {
    const transactions = await this.ormRepository.find({
      where: {
        date,
        userId,
      },
    });
    return transactions;
  }

  public async findById(
    transactionId: string,
  ): Promise<ITransaction | undefined> {
    const foundTransaction = await this.ormRepository.findOne(transactionId);
    return foundTransaction;
  }

  public async findByTransactionIdUserId({
    transactionId,
    userId,
  }: IDeleteTransactionDTO): Promise<ITransaction | undefined> {
    const deletedTransaction = await this.ormRepository.findOne({
      where: {
        id: transactionId,
        userId,
      },
    });
    return deletedTransaction;
  }

  public async findByUserId(userId: string): Promise<ITransaction[]> {
    const foundTransactions = await this.ormRepository.find({
      where: {
        userId,
      },
    });
    return foundTransactions;
  }

  public async findByDateBankAccountId({
    month,
    year,
    userId,
  }: IListTransactionByDateBankAccountIdDTO): Promise<ITransaction[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const foundTransactions = await this.ormRepository.find({
      where: [
        {
          date: Raw(
            dateFieldName =>
              `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
          ),
          userId,
        },
      ],
    });
    return foundTransactions;
  }

  public async save(transaction: ITransaction): Promise<void> {
    await this.ormRepository.save(transaction);
  }
}
