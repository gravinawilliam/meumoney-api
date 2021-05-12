import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUser from '../models/IUser';

export default interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
}
