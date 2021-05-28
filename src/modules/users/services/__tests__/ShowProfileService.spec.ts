import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from '../ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('Show Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'william@example.com',
      password: '123456789',
      name: 'William',
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile).toHaveProperty('id');
  });

  it('must not be able to show the profile with invalid user id', async () => {
    await expect(
      showProfile.execute({
        userId: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
