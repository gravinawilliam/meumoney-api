import { v4 } from 'uuid';
import Notification from '../infra/typeorm/entities/Notification';
import ICreateNotificationDTO from '../interfaces/dtos/ICreateNotificationDTO';
import INotification from '../interfaces/models/INotification';
import INotificationsRepository from '../interfaces/repositories/INotificationsRepository';

export default class FakeNotificationsRepository
  implements INotificationsRepository
{
  private notifications: INotification[] = [];

  public async create(
    notification: ICreateNotificationDTO,
  ): Promise<INotification> {
    const notificationCreated = Object.assign(new Notification(), {
      id: v4(),
      ...notification,
    });
    return notificationCreated;
  }

  public async save(notification: INotification): Promise<void> {
    this.notifications.push(notification);
  }

  public async findUnseenNotification(
    userId: string,
  ): Promise<INotification | undefined> {
    const foundNotification = this.notifications.find(
      notification =>
        notification.userId === userId && notification.viewed === false,
    );
    return foundNotification;
  }
}
