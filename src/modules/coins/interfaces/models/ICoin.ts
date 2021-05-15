export default interface ICoin {
  readonly id: string;
  name: string;
  symbol: string;
  buy: number;
  sell: number;
  createdAt: Date;
  updatedAt: Date;
}
