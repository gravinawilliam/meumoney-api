import SymbolCoinEnum from '../enums/SymbolCoinEnum';

export default interface IBankAccount {
  readonly id: string;
  accountNumbers: string;
  cardholderName: string;
  balance: number;
  monthValidity: number;
  yearValidity: number;
  userId: string;
  bankId: string;
  symbolCoin: SymbolCoinEnum;
  createdAt: Date;
  updatedAt: Date;
}
