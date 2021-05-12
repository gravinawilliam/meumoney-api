import { v4 } from 'uuid';
import IUserRole from '@modules/users/interfaces/models/IUserRole';
import IFindByRoleAndUserIdDTO from '@modules/users/interfaces/dtos/IFindByRoleAndUserIdDTO';
import IUserRolesRepository from '@modules/users/interfaces/repositories/IUserRolesRepository';
import ICreateRoleDTO from '../interfaces/dtos/ICreateRoleDTO';
import UserRole from '../infra/typeorm/entities/UserRole';

export default class FakeUserRolesRepository implements IUserRolesRepository {
  private roles: IUserRole[] = [];

  public async findByRoleAndUserId({
    userId,
    role,
  }: IFindByRoleAndUserIdDTO): Promise<IUserRole | undefined> {
    const foundRole = this.roles.find(
      userRole => userRole.userId === userId && userRole.role === role,
    );
    return foundRole;
  }

  public async create(userRole: ICreateRoleDTO): Promise<IUserRole> {
    const userRoleCreated = Object.assign(new UserRole(), {
      id: v4(),
      ...userRole,
    });
    this.roles.push(userRoleCreated);
    return userRoleCreated;
  }
}
