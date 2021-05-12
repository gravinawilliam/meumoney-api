import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
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
});
