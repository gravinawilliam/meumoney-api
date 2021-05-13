import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import { CREATED } from '@shared/constants/HttpStatusCode';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      email,
      password,
      name,
    });
    return res.status(CREATED).json(classToClass(user));
  }
}
