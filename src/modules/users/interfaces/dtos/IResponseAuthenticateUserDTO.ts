import IUser from '../models/IUser';

export default interface IResponseAuthenticateUserDTO {
  user: IUser;
  token: string;
}
