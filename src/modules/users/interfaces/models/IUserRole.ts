export default interface IUserRole {
  readonly id: string;
  userId: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
