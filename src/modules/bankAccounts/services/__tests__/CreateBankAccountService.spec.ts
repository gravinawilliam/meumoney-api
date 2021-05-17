import FakeBankAccountsRepository from '@modules/bankAccounts/fakes/FakeBankAccountsRepository';
import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import SymbolCoinEnum from '@modules/bankAccounts/interfaces/enums/SymbolCoinEnum';
import FakeUsersRepository from '@modules/users/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateBankAccountService from '../CreateBankAccountService';

let createBankAccount: CreateBankAccountService;
let fakeBankAccountsRepository: FakeBankAccountsRepository;
let fakeBanksRepository: FakeBanksRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeBanksRepository = new FakeBanksRepository();
    fakeBankAccountsRepository = new FakeBankAccountsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createBankAccount = new CreateBankAccountService(
      fakeBankAccountsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create bank account', async () => {
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
    const bankAccount = await createBankAccount.execute({
      accountNumbers: '1323',
      balance: 1456,
      bankId: bank.id,
      cardholderName: 'William Gravina',
      monthValidity: 3,
      userId: user.id,
      yearValidity: 21,
      symbolCoin: SymbolCoinEnum.USD,
    });
    expect(bankAccount).toHaveProperty('id');
  });

  it('you should not be able to create a new bank account with an invalid user id', async () => {
    const bank = await fakeBanksRepository.create({
      name: 'Nubank',
      redColorCard: 12,
      greenColorCard: 123,
      blueColorCard: 123,
    });
    await expect(
      createBankAccount.execute({
        accountNumbers: '1323',
        balance: 1456,
        bankId: bank.id,
        cardholderName: 'William Gravina',
        monthValidity: 3,
        userId: 'invalid id',
        yearValidity: 21,
        symbolCoin: SymbolCoinEnum.USD,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
