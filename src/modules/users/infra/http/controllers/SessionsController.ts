import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const user = await authenticateUser.execute({
      password,
      email,
    });
    return res.json(classToClass(user));
  }
}
