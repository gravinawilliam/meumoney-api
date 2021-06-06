import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import FakeTransactionsRepository from '@modules/transactions/fakes/FakeTransactionsRepository';
import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListTransactionByDateUserIdService from '../ListTransactionByDateUserIdService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeBanksRepository: FakeBanksRepository;
let listTransactionByDateUserId: ListTransactionByDateUserIdService;

describe('List Transaction By Date User Id', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBanksRepository = new FakeBanksRepository();
    listTransactionByDateUserId = new ListTransactionByDateUserIdService(
      fakeTransactionsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list transactions by date and user id', async () => {
    const bank = await fakeBanksRepository.create({
      blueColorCard: 123,
      greenColorCard: 154,
      redColorCard: 133,
      name: 'Nubank',
    });

    const user = await fakeUsersRepository.create({
      email: 'will@gmail.com',
      name: 'will',
      password: '21312',
    });

    const transaction = await fakeTransactionsRepository.create({
      date: new Date(2021, 5, 22),
      fromBankAccountId: bank.id,
      note: 'note',
      symbolCoin: 'BRL',
      title: 'title',
      transactionType: 'gain',
      userId: user.id,
      value: 123,
    });

    await fakeTransactionsRepository.save(transaction);

    const transactions = await listTransactionByDateUserId.execute({
      date: '2021-06-22',
      userId: user.id,
    });
    expect(transactions).toEqual([transaction]);
  });

  it('should not be able to list transactions by date and user id with an invalid user id', async () => {
    await expect(
      listTransactionByDateUserId.execute({
        date: '2021-06-22',
        userId: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
