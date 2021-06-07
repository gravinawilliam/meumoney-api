import { getRepository, Repository } from 'typeorm';
import INotificationsRepository from '@modules/notifications/interfaces/repositories/INotificationsRepository';
import INotification from '@modules/notifications/interfaces/models/INotification';
import ICreateNotificationDTO from '@modules/notifications/interfaces/dtos/ICreateNotificationDTO';
import Notification from '../entities/Notification';

export default class NotificationsRepository
  implements INotificationsRepository
{
  private ormRepository: Repository<INotification>;

  constructor() {
    this.ormRepository = getRepository(Notification);
  }

  public async create(
    notification: ICreateNotificationDTO,
  ): Promise<INotification> {
    const notificationCreated = this.ormRepository.create(notification);
    return notificationCreated;
  }

  public async save(notification: INotification): Promise<void> {
    await this.ormRepository.save(notification);
  }

  public async findUnseenNotification(
    userId: string,
  ): Promise<INotification | undefined> {
    const foundNotification = this.ormRepository.findOne({
      where: {
        userId,
        viewed: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return foundNotification;
  }
}
