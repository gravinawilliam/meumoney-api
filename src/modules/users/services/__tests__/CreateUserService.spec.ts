import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeValidatorEmailProvider from '@shared/container/providers/ValidatorEmailProvider/fakes/FakeValidatorEmailProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeValidatorEmailProvider: FakeValidatorEmailProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeValidatorEmailProvider = new FakeValidatorEmailProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeValidatorEmailProvider,
    );
  });

  it('should be able to create user', async () => {
    const user = await createUser.execute({
      email: 'william@example.com',
      password: '123456789',
      name: 'William',
    });
    expect(user).toHaveProperty('id');
  });

  it('must be able to hash the password', async () => {
    const user = await createUser.execute({
      email: 'william@example.com',
      password: '123456789',
      name: 'William',
    });
    const hashedPassword = await fakeHashProvider.generateHash('123456789');
    expect(user.password).toBe(hashedPassword);
  });

  it('should not be able to create a new user with invalid email', async () => {
    await expect(
      createUser.execute({
        email: 'invalid email',
        password: '123456789',
        name: 'William',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must not be able to create a new user with email is already registered in the database', async () => {
    await fakeUsersRepository.create({
      email: 'william@example.com',
      password: '123456781',
      name: 'William',
    });

    await expect(
      createUser.execute({
        email: 'william@example.com',
        password: '123456789',
        name: 'William2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
