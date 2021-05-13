import IFindByRoleAndUserIdDTO from '../dtos/IFindByRoleAndUserIdDTO';
import IUserRole from '../models/IUserRole';

export default interface IUserRolesRepository {
  findByRoleAndUserId({
    userId,
    role,
  }: IFindByRoleAndUserIdDTO): Promise<IUserRole | undefined>;
}
