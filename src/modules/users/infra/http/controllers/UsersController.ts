import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import { CREATED, OK } from '@shared/constants/HttpStatusCode';
import DeleteUserService from '@modules/users/services/DeleteUserService';

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

  public async delete(req: Request, res: Response): Promise<Response> {
    const { password } = req.query;
    const userId = req.user.id;
    const deleteUser = container.resolve(DeleteUserService);
    const user = await deleteUser.execute({
      password: String(password),
      userId,
    });
    return res.status(OK).json(classToClass(user));
  }
}
