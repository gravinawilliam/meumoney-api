import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';
import ITransaction from '@modules/transactions/interfaces/models/ITransaction';
import ITransactionsRepository from '@modules/transactions/interfaces/repositories/ITransactionsRepository';
import { container, inject, injectable } from 'tsyringe';
import dotenv from 'dotenv';
import IAntiFraudProvider from '../interfaces/IAntiFraudProvider';

dotenv.config();

@injectable()
export default class BenfordAntiFraudProvider implements IAntiFraudProvider {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async benford(transaction: ITransaction): Promise<void> {
    const transactions = await this.transactionsRepository.findByUserId(
      transaction.userId,
    );
    transactions.push(transaction);
    if (
      transactions.length
        .toString()
        .substr(transactions.length.toString().length - 2, 2) === '00'
    ) {
      const numberTimesItAppears = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < transactions.length; i += 1) {
        const firstNumber = transactions[i].value.toString().substring(1, 0);
        switch (firstNumber) {
          case '0':
            numberTimesItAppears[0] += 1;
            break;
          case '1':
            numberTimesItAppears[1] += 1;
            break;
          case '2':
            numberTimesItAppears[2] += 1;
            break;
          case '3':
            numberTimesItAppears[3] += 1;
            break;
          case '4':
            numberTimesItAppears[4] += 1;
            break;
          case '5':
            numberTimesItAppears[5] += 1;
            break;
          case '6':
            numberTimesItAppears[6] += 1;
            break;
          case '7':
            numberTimesItAppears[7] += 1;
            break;
          case '8':
            numberTimesItAppears[8] += 1;
            break;
          case '9':
            numberTimesItAppears[9] += 1;
            break;
          default:
            break;
        }
      }
      const percentageTimesItAppears = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < numberTimesItAppears.length; i += 1) {
        percentageTimesItAppears[i] =
          numberTimesItAppears[i] / transactions.length;
      }
      // TODO: Refatorar esses valores para env
      if (
        percentageTimesItAppears[0] < 0.0403 ||
        percentageTimesItAppears[1] < 0.289 ||
        percentageTimesItAppears[2] < 0.169 ||
        percentageTimesItAppears[3] < 0.1199 ||
        percentageTimesItAppears[4] < 0.093 ||
        percentageTimesItAppears[5] < 0.0759 ||
        percentageTimesItAppears[6] < 0.0642 ||
        percentageTimesItAppears[7] < 0.0556 ||
        percentageTimesItAppears[8] < 0.0491 ||
        percentageTimesItAppears[9] < 0.0491
      ) {
        const createNotification = container.resolve(CreateNotificationService);
        await createNotification.execute({
          content:
            process.env.MESSAGE_BENFORD !== undefined
              ? process.env.MESSAGE_BENFORD
              : 'Message Benford',
          transactionId: transaction.id,
          userId: transaction.userId,
        });
      }
    }
  }
}
