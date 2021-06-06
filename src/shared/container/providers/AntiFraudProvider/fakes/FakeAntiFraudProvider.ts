import ITransaction from '@modules/transactions/interfaces/models/ITransaction';
import { NOT_FOUND } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
import IAntiFraudProvider from '../interfaces/IAntiFraudProvider';

export default class FakeAntiFraudProvider implements IAntiFraudProvider {
  public async benford(transaction: ITransaction): Promise<void> {
    if (!transaction) {
      throw new AppError('Transaction benford not found', NOT_FOUND);
    }
  }
}
