export default interface ITransaction {
  readonly id: string;
  value: number;
  transactionType: string;
  title: string;
  note: string;
  symbolCoin: string;
  userId: string;
  fromBankAccountId: string;
  toBankAccountId?: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
