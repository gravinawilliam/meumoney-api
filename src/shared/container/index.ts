import UserRolesRepository from '@modules/users/infra/typeorm/repositories/UserRolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserRolesRepository from '@modules/users/interfaces/repositories/IUserRolesRepository';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import { container } from 'tsyringe';
import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserRolesRepository>(
  'UserRolesRepository',
  UserRolesRepository,
);
