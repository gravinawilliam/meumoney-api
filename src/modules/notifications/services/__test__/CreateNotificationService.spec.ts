import FakeNotificationsRepository from '@modules/notifications/fakes/FakeNotificationsRepository';
import CreateNotificationService from '../CreateNotificationService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let createNotification: CreateNotificationService;

describe('Create Notification', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createNotification = new CreateNotificationService(
      fakeNotificationsRepository,
    );
  });

  it('must be able to create notification', async () => {
    const notificationCreated = await createNotification.execute({
      content: 'content notification',
      transactionId: 'transaction id',
      userId: 'user id',
    });
    expect(notificationCreated).toBe(true);
  });
});
