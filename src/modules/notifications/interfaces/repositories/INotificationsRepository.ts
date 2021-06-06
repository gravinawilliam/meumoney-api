import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import INotification from '../models/INotification';

export default interface INotificationsRepository {
  create(notification: ICreateNotificationDTO): Promise<INotification>;
  save(notification: INotification): Promise<void>;
}
