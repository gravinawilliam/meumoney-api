export default interface INotification {
  readonly id: string;
  userId: string;
  content: string;
  transactionId: string;
  viewed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
