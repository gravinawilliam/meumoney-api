import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import INotification from '../models/INotification';

export default interface INotificationsRepository {
  create(notification: ICreateNotificationDTO): Promise<INotification>;
  findUnseenNotification(userId: string): Promise<INotification | undefined>;
  save(notification: INotification): Promise<void>;
}
