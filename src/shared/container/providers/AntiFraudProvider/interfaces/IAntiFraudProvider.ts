import ITransaction from '@modules/transactions/interfaces/models/ITransaction';

export default interface IAntiFraudProvider {
  benford(transaction: ITransaction): Promise<void>;
}
