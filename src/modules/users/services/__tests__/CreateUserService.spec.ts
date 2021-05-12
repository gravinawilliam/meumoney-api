import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create user', async () => {
    const user = await createUser.execute({
      email: 'william@example.com',
      password: '123456789',
      name: 'William',
    });
    expect(user).toHaveProperty('id');
  });
});
