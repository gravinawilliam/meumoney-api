export default interface ICreateTransactionDTO {
  value: number;
  transactionType: string;
  title: string;
  note: string;
  date: Date;
  symbolCoin: string;
  userId: string;
  fromBankAccountId: string;
  toBankAccountId?: string;
}
