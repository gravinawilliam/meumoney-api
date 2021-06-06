import ShowUnseenNotificationByUserService from '@modules/notifications/services/ShowUnseenNotificationByUserService';
import { OK } from '@shared/constants/HttpStatusCode';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class NotificationsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const showUnseenNotificationByUser = container.resolve(
      ShowUnseenNotificationByUserService,
    );
    const httpResponse = await showUnseenNotificationByUser.execute({
      userId,
    });
    return res.status(OK).json(classToClass(httpResponse));
  }
}
