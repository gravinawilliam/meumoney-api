import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { OK } from '@shared/constants/HttpStatusCode';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({
      password,
      email,
    });
    return res.status(OK).json({ user: classToClass(user), token });
  }
}
