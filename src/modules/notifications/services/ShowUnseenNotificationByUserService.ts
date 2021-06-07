import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { NOT_FOUND, NO_CONTENT } from '@shared/constants/HttpStatusCode';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import INotificationsRepository from '../interfaces/repositories/INotificationsRepository';
import IListNotificationsByUserDTO from '../interfaces/dtos/IListNotificationsByUserDTO';
import INotification from '../interfaces/models/INotification';

@injectable()
export default class ShowUnseenNotificationByUserService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
  }: IListNotificationsByUserDTO): Promise<INotification> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.', NOT_FOUND);
    }
    const notification =
      await this.notificationsRepository.findUnseenNotification(userId);
    if (!notification) {
      throw new AppError('Notification not found.', NO_CONTENT);
    }
    notification.viewed = true;
    await this.notificationsRepository.save(notification);
    return notification;
  }
}
