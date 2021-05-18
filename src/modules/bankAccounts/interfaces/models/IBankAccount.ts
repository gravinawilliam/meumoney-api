export default interface IBankAccount {
  readonly id: string;
  accountNumbers: string;
  cardholderName: string;
  balance: number;
  monthValidity: number;
  yearValidity: number;
  userId: string;
  bankId: string;
  symbolCoin: string;
  createdAt: Date;
  updatedAt: Date;
}
