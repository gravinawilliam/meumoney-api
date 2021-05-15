import BanksRepository from '@modules/banks/infra/typeorm/repositories/BanksRepository';
import IBanksRepository from '@modules/banks/interfaces/repositories/IBanksRepository';
import CoinsRepository from '@modules/coins/infra/typeorm/repositories/CoinsRepository';
import ICoinsRepository from '@modules/coins/interfaces/repositories/ICoinsRepository';
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

container.registerSingleton<IBanksRepository>(
  'BanksRepository',
  BanksRepository,
);

container.registerSingleton<ICoinsRepository>(
  'CoinsRepository',
  CoinsRepository,
);
