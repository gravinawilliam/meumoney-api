export default interface IBank {
  readonly id: string;
  name: string;
  logo: string;
  redColorCard: number;
  greenColorCard: number;
  blueColorCard: number;
  createdAt: Date;
  updatedAt: Date;
}
