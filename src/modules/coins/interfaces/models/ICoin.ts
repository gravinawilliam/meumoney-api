export default interface ICoin {
  readonly id: string;
  name: string;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
}
