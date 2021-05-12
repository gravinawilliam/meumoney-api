import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import CreateBankService from '../CreateBankService';

let fakeBanksRepository: FakeBanksRepository;
let createBank: CreateBankService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeBanksRepository = new FakeBanksRepository();
    createBank = new CreateBankService(fakeBanksRepository);
  });

  it('should be able to create new bank', async () => {
    const bank = await createBank.execute({
      name: 'Nubank',
      blueColorCard: 211,
      greenColorCard: 123,
      redColorCard: 31,
    });
    expect(bank).toHaveProperty('id');
  });
});
