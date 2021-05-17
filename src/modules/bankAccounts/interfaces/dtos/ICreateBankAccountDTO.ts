import SymbolCoinEnum from '../enums/SymbolCoinEnum';

export default interface ICreateBankAccountDTO {
  accountNumbers: string;
  cardholderName: string;
  balance: number;
  monthValidity: number;
  yearValidity: number;
  userId: string;
  bankId: string;
  symbolCoin: SymbolCoinEnum;
}
