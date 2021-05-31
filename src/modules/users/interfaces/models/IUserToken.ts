export default interface IUserToken {
  readonly id: string;
  email: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
