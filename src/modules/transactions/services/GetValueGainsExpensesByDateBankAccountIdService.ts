import { inject, injectable } from 'tsyringe';
import ITransactionsRepository from '../interfaces/repositories/ITransactionsRepository';
import IResponseGetValueGainsExpensesByBankAccountMonthYearDTO from '../interfaces/dtos/IResponseGetValueGainsExpensesByBankAccountMonthYearDTO';
import IListTransactionByDateBankAccountIdDTO from '../interfaces/dtos/IListTransactionByDateBankAccountIdDTO';

@injectable()
export default class GetValueGainsExpensesByDateBankAccountIdService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    bankAccountId,
    month,
    year,
    userId,
  }: IListTransactionByDateBankAccountIdDTO): Promise<IResponseGetValueGainsExpensesByBankAccountMonthYearDTO> {
    const transactions =
      await this.transactionsRepository.findByDateBankAccountId({
        bankAccountId,
        userId,
        month,
        year,
      });

    let earningsAmount = 0;

    let expenseAmount = 0;

    for (let index = 0; index < transactions.length; index += 1) {
      if (transactions[index].transactionType === 'gain') {
        earningsAmount += transactions[index].value;
      } else if (transactions[index].transactionType === 'expense') {
        expenseAmount += transactions[index].value;
      } else if (
        transactions[index].transactionType === 'transfer' &&
        transactions[index].fromBankAccountId === bankAccountId
      ) {
        expenseAmount += transactions[index].value;
      } else if (
        transactions[index].transactionType === 'transfer' &&
        transactions[index].toBankAccountId === bankAccountId
      ) {
        earningsAmount += transactions[index].value;
      }
    }
    return { earningsAmount, expenseAmount };
  }
}
