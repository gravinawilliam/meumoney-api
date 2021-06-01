import IUserToken from '../models/IUserToken';
import IFindUserTokenDTO from '../dtos/IFindUserTokenDTO';
import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';

export default interface IUserTokensRepository {
  findUserToken({
    email,
    token,
  }: IFindUserTokenDTO): Promise<IUserToken | undefined>;
  findByEmail(email: string): Promise<IUserToken | undefined>;
  create(userToken: ICreateUserTokenDTO): Promise<IUserToken>;
  save(userToken: IUserToken): Promise<IUserToken>;
}
