import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { OK } from '@shared/constants/HttpStatusCode';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const httpResponse = await showProfile.execute({
      userId,
    });
    return res.status(OK).json(classToClass(httpResponse));
  }
}
