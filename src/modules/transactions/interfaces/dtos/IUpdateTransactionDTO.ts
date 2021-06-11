import ICreateTransactionDTO from './ICreateTransactionDTO';

export default interface IUpdateTransactionDTO extends ICreateTransactionDTO {
  transactionId: string;
}
