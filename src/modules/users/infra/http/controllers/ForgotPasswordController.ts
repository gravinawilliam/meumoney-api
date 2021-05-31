import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { NO_CONTENT } from '@shared/constants/HttpStatusCode';
import SendForgotPasswordService from '@modules/users/services/SendForgotPasswordService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const createUser = container.resolve(SendForgotPasswordService);
    await createUser.execute({
      email,
    });
    return res.status(NO_CONTENT).json();
  }
}
