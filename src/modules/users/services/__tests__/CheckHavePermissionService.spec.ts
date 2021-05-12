import FakeUserRolesRepository from '@modules/users/fakes/FakeUserRolesRepository';
import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import CheckHavePermissionService from '../CheckHavePermissionService';

let fakeUserRolesRepository: FakeUserRolesRepository;
let fakeUsersRepository: FakeUsersRepository;
let checkHavePermission: CheckHavePermissionService;

describe('CheckHavePermission', () => {
  beforeEach(() => {
    fakeUserRolesRepository = new FakeUserRolesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    checkHavePermission = new CheckHavePermissionService(
      fakeUserRolesRepository,
    );
  });

  it('must be able for the user to have permission', async () => {
    const user = await fakeUsersRepository.create({
      email: 'william@gmail.com',
      name: 'William',
      password: '123456789',
    });
    await fakeUserRolesRepository.create({
      role: 'admin',
      userId: user.id,
    });
    const havePermission = await checkHavePermission.execute({
      role: 'admin',
      userId: user.id,
    });
    expect(havePermission).toHaveProperty('id');
  });
});
