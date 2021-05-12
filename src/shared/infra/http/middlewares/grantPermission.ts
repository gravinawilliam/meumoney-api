import CheckHavePermissionService from '@modules/users/services/CheckHavePermissionService';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

export default async function grantPermission(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const checkHavePermission = container.resolve(CheckHavePermissionService);
  await checkHavePermission.execute({
    role: 'admin',
    userId: req.user.id,
  });
  return next();
}
