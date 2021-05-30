import FakeBankAccountsRepository from '@modules/bankAccounts/fakes/FakeBankAccountsRepository';
import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import FakeTransactionsRepository from '@modules/transactions/fakes/FakeTransactionsRepository';
import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateTransactionService from '../CreateTransactionService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeBankAccountsRepository: FakeBankAccountsRepository;
let fakeBanksRepository: FakeBanksRepository;
let createTransaction: CreateTransactionService;

describe('Create Transaction', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBankAccountsRepository = new FakeBankAccountsRepository();
    fakeBanksRepository = new FakeBanksRepository();
    createTransaction = new CreateTransactionService(
      fakeTransactionsRepository,
      fakeUsersRepository,
      fakeBankAccountsRepository,
    );
  });

  it('should be able to create new transaction', async () => {
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

    const bankAccount = await fakeBankAccountsRepository.create({
      accountNumbers: '123',
      balance: 1456.5,
      bankId: bank.id,
      cardholderName: 'William',
      monthValidity: 5,
      yearValidity: 25,
      symbolCoin: 'BRL',
      userId: user.id,
    });

    const transactionCreated = await createTransaction.execute({
      date: new Date(2021, 6, 21),
      fromBankAccountId: bankAccount.id,
      note: 'note',
      symbolCoin: 'BRL',
      title: 'title',
      transactionType: 'gain',
      userId: user.id,
      value: 123,
    });

    expect(transactionCreated).toHaveProperty('id');
  });

  it('should not be able to create a negative transaction', async () => {
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

    const bankAccount = await fakeBankAccountsRepository.create({
      accountNumbers: '123',
      balance: 1456.5,
      bankId: bank.id,
      cardholderName: 'William',
      monthValidity: 5,
      yearValidity: 25,
      symbolCoin: 'BRL',
      userId: user.id,
    });

    await expect(
      createTransaction.execute({
        date: new Date(2021, 6, 21),
        fromBankAccountId: bankAccount.id,
        note: 'note',
        symbolCoin: 'BRL',
        title: 'title',
        transactionType: 'gain',
        userId: user.id,
        value: -123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a transaction with an invalid user id', async () => {
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

    const bankAccount = await fakeBankAccountsRepository.create({
      accountNumbers: '123',
      balance: 1456.5,
      bankId: bank.id,
      cardholderName: 'William',
      monthValidity: 5,
      yearValidity: 25,
      symbolCoin: 'BRL',
      userId: user.id,
    });

    await expect(
      createTransaction.execute({
        date: new Date(2021, 6, 21),
        fromBankAccountId: bankAccount.id,
        note: 'note',
        symbolCoin: 'BRL',
        title: 'title',
        transactionType: 'gain',
        userId: 'invalid id',
        value: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
