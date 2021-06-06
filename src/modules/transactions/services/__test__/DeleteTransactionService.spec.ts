import FakeBankAccountsRepository from '@modules/bankAccounts/fakes/FakeBankAccountsRepository';
import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import FakeTransactionsRepository from '@modules/transactions/fakes/FakeTransactionsRepository';
import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import DeleteTransactionService from '../DeleteTransactionService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeBankAccountsRepository: FakeBankAccountsRepository;
let fakeBanksRepository: FakeBanksRepository;
let deleteTransaction: DeleteTransactionService;

describe('Delete Transaction', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBankAccountsRepository = new FakeBankAccountsRepository();
    fakeBanksRepository = new FakeBanksRepository();
    deleteTransaction = new DeleteTransactionService(
      fakeTransactionsRepository,
      fakeBankAccountsRepository,
    );
  });

  it('must be able to delete transaction', async () => {
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

    const transaction = await fakeTransactionsRepository.create({
      date: new Date(2021, 6, 21),
      fromBankAccountId: bankAccount.id,
      note: 'note',
      symbolCoin: 'BRL',
      title: 'title',
      transactionType: 'gain',
      userId: user.id,
      value: 123,
    });

    await fakeTransactionsRepository.save(transaction);

    const deletedTransaction = await deleteTransaction.execute({
      transactionId: transaction.id,
      userId: user.id,
    });

    expect(deletedTransaction).toHaveProperty('id');
  });
});
