import FakeBankAccountsRepository from '@modules/bankAccounts/fakes/FakeBankAccountsRepository';
import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import ListBankAccountsByUserIdService from '../ListBankAccountsByUserIdService';

let fakeBankAccountsRepository: FakeBankAccountsRepository;
let fakeBanksRepository: FakeBanksRepository;
let fakeUsersRepository: FakeUsersRepository;
let listBankAccountsByUserId: ListBankAccountsByUserIdService;

describe('ListBankAccountByUserIds', () => {
  beforeEach(() => {
    fakeBankAccountsRepository = new FakeBankAccountsRepository();
    fakeBanksRepository = new FakeBanksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listBankAccountsByUserId = new ListBankAccountsByUserIdService(
      fakeBankAccountsRepository,
    );
  });

  it('should be able to list bank accounts by user id', async () => {
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
    const bankAccount1 = await fakeBankAccountsRepository.create({
      accountNumbers: '1',
      balance: 1324,
      bankId: bank.id,
      cardholderName: 'William',
      monthValidity: 12,
      symbolCoin: 'BRL',
      userId: user.id,
      yearValidity: 32,
    });
    const bankAccount2 = await fakeBankAccountsRepository.create({
      accountNumbers: '1',
      balance: 1324,
      bankId: bank.id,
      cardholderName: 'William',
      monthValidity: 12,
      symbolCoin: 'BRL',
      userId: user.id,
      yearValidity: 32,
    });
    const banks = await listBankAccountsByUserId.execute({
      userId: user.id,
    });
    expect(banks).toEqual([bankAccount1, bankAccount2]);
  });
});
