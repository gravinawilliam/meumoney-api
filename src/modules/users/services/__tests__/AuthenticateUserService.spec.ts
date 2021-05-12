import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from '../AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to make login with mail', async () => {
    await fakeUsersRepository.create({
      name: 'William',
      email: 'william@example.com',
      password: '123456789',
    });
    const user = await authenticateUser.execute({
      email: 'william@example.com',
      password: '123456789',
    });
    expect(user).toHaveProperty('token');
  });

  it('should not be able to  make login with password valid and email invalid', async () => {
    await fakeUsersRepository.create({
      name: 'willy',
      email: 'william@example.com',
      password: '123456789',
    });
    await expect(
      authenticateUser.execute({
        email: 'invalidEmail',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to  make login with password invalid and email valid', async () => {
    await fakeUsersRepository.create({
      name: 'willy',
      email: 'william@example.com',
      password: '123456789',
    });
    await expect(
      authenticateUser.execute({
        email: 'william@example.com',
        password: 'invalidPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
