import FakeNotificationsRepository from '@modules/notifications/fakes/FakeNotificationsRepository';
import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowUnseenNotificationByUserService from '../ShowUnseenNotificationByUserService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeUsersRepository: FakeUsersRepository;
let showUnseenNotificationByUser: ShowUnseenNotificationByUserService;

describe('Show Unseen Notification By User', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    showUnseenNotificationByUser = new ShowUnseenNotificationByUserService(
      fakeNotificationsRepository,
      fakeUsersRepository,
    );
  });

  it('must be able to show unseen notification', async () => {
    const user = await fakeUsersRepository.create({
      email: 'wil@gmail.com',
      name: 'will',
      password: '123456789',
    });

    const notification = await fakeNotificationsRepository.create({
      content: 'content notification',
      transactionId: 'transaction id',
      userId: user.id,
    });

    await fakeNotificationsRepository.save(notification);

    const foundNotification = await showUnseenNotificationByUser.execute({
      userId: user.id,
    });

    expect(foundNotification).toEqual(notification);
    expect(foundNotification.viewed).toBe(true);
  });

  it('should not be able to show unseen notification with invalid user id', async () => {
    await expect(
      showUnseenNotificationByUser.execute({
        userId: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
