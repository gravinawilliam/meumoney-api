import BankAccountsRepository from '@modules/bankAccounts/infra/typeorm/repositories/BankAccountsRepository';
import IBankAccountsRepository from '@modules/bankAccounts/interfaces/repositories/IBankAccountsRepository';
import BanksRepository from '@modules/banks/infra/typeorm/repositories/BanksRepository';
import IBanksRepository from '@modules/banks/interfaces/repositories/IBanksRepository';
import CoinsRepository from '@modules/coins/infra/typeorm/repositories/CoinsRepository';
import ICoinsRepository from '@modules/coins/interfaces/repositories/ICoinsRepository';
import TransactionsRepository from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';
import ITransactionsRepository from '@modules/transactions/interfaces/repositories/ITransactionsRepository';
import UserRolesRepository from '@modules/users/infra/typeorm/repositories/UserRolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserRolesRepository from '@modules/users/interfaces/repositories/IUserRolesRepository';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/interfaces/repositories/IUserTokensRepository';
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

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IBanksRepository>(
  'BanksRepository',
  BanksRepository,
);

container.registerSingleton<ICoinsRepository>(
  'CoinsRepository',
  CoinsRepository,
);

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
