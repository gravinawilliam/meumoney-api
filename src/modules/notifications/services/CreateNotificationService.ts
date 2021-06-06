import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { NOT_FOUND } from '@shared/constants/HttpStatusCode';
import INotificationsRepository from '../interfaces/repositories/INotificationsRepository';
import ICreateNotificationDTO from '../interfaces/dtos/ICreateNotificationDTO';

@injectable()
export default class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    userId,
    content,
    transactionId,
  }: ICreateNotificationDTO): Promise<boolean> {
    if (!userId) {
      throw new AppError('User id null.', NOT_FOUND);
    }
    if (!content) {
      throw new AppError('Content null.', NOT_FOUND);
    }
    if (!transactionId) {
      throw new AppError('Transaction id null.', NOT_FOUND);
    }
    try {
      const notification = await this.notificationsRepository.create({
        content,
        transactionId,
        userId,
      });
      await this.notificationsRepository.save(notification);
      return true;
    } catch (error) {
      return false;
    }
  }
}
