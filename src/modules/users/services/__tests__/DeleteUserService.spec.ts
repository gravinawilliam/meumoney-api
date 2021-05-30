import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import DeleteUserService from '../DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let deleteUser: DeleteUserService;

describe('Delete User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    deleteUser = new DeleteUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to delete user', async () => {
    const user = await fakeUsersRepository.create({
      email: 'william@example.com',
      password: '123456789',
      name: 'William',
    });
    const deletedUser = await deleteUser.execute({
      userId: user.id,
      password: user.password,
    });
    expect(deletedUser).toEqual(user);
  });
});
