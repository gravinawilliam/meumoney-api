import IFindByRoleAndUserIdDTO from '@modules/users/interfaces/dtos/IFindByRoleAndUserIdDTO';
import IUserRole from '@modules/users/interfaces/models/IUserRole';
import IUserRolesRepository from '@modules/users/interfaces/repositories/IUserRolesRepository';
import { getRepository, Repository } from 'typeorm';
import UserRole from '../entities/UserRole';

export default class UserRolesRepository implements IUserRolesRepository {
  private ormRepository: Repository<IUserRole>;

  constructor() {
    this.ormRepository = getRepository(UserRole);
  }

  public async findByRoleAndUserId({
    userId,
    role,
  }: IFindByRoleAndUserIdDTO): Promise<IUserRole | undefined> {
    const foundPermission = this.ormRepository.findOne({
      where: {
        userId,
        role,
      },
    });
    return foundPermission;
  }
}
