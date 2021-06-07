import FakeBankAccountsRepository from '@modules/bankAccounts/fakes/FakeBankAccountsRepository';
import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import DeleteBankAccountService from '../DeleteBankAccountService';

let deleteBankAccount: DeleteBankAccountService;
let fakeBankAccountsRepository: FakeBankAccountsRepository;
let fakeBanksRepository: FakeBanksRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('Delete Bank Account', () => {
  beforeEach(() => {
    fakeBanksRepository = new FakeBanksRepository();
    fakeBankAccountsRepository = new FakeBankAccountsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    deleteBankAccount = new DeleteBankAccountService(
      fakeBankAccountsRepository,
    );
  });

  it('should be able to delete bank account', async () => {
    const bank = await fakeBanksRepository.create({
      name: 'Nubank',
      redColorCard: 12,
      greenColorCard: 123,
      blueColorCard: 123,
    });

    const user = await fakeUsersRepository.create({
      email: 'william@example.com',
      name: 'William',
      password: '123456789',
    });

    const bankAccount = await fakeBankAccountsRepository.create({
      accountNumbers: '1323',
      balance: 1456,
      bankId: bank.id,
      cardholderName: 'William Gravina',
      monthValidity: 3,
      userId: user.id,
      yearValidity: 21,
      symbolCoin: 'USD',
    });

    const deletedBankAccount = await deleteBankAccount.execute({
      userId: user.id,
      bankAccountId: bankAccount.id,
    });

    expect(deletedBankAccount).toEqual(bankAccount);
  });
});
