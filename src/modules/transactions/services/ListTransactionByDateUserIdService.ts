import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import { NOT_FOUND } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '../interfaces/repositories/ITransactionsRepository';
import ITransaction from '../interfaces/models/ITransaction';
import IListTransactionByDateUserIdDTO from '../interfaces/dtos/IListTransactionByDateUserIdDTO';

@injectable()
export default class ListTransactionByDateUserIdService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    date,
  }: IListTransactionByDateUserIdDTO): Promise<ITransaction[]> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.', NOT_FOUND);
    }
    const transactions = await this.transactionsRepository.findByDateUserId({
      date,
      userId,
    });
    return transactions;
  }
}
