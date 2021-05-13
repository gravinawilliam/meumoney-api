import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IFindByRoleAndUserIdDTO from '../interfaces/dtos/IFindByRoleAndUserIdDTO';
import IUserRole from '../interfaces/models/IUserRole';
import IUserRolesRepository from '../interfaces/repositories/IUserRolesRepository';

@injectable()
export default class CheckHavePermissionService {
  constructor(
    @inject('UserRolesRepository')
    private userRolesRepository: IUserRolesRepository,
  ) {}

  public async execute({
    role,
    userId,
  }: IFindByRoleAndUserIdDTO): Promise<IUserRole> {
    const havePermission = await this.userRolesRepository.findByRoleAndUserId({
      role,
      userId,
    });
    if (!havePermission) {
      throw new AppError('User does not have permission', 403);
    }
    return havePermission;
  }
}
