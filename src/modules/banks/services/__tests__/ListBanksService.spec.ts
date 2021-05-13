import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import ListBanksService from '../ListBanksService';

let fakeBanksRepository: FakeBanksRepository;
let listBanks: ListBanksService;

describe('ListBanks', () => {
  beforeEach(() => {
    fakeBanksRepository = new FakeBanksRepository();
    listBanks = new ListBanksService(fakeBanksRepository);
  });

  it('should be able to create new bank', async () => {
    const bank1 = await fakeBanksRepository.create({
      name: 'Nubank',
      blueColorCard: 211,
      greenColorCard: 123,
      redColorCard: 31,
    });
    const bank2 = await fakeBanksRepository.create({
      name: 'Inter',
      blueColorCard: 211,
      greenColorCard: 123,
      redColorCard: 31,
    });
    const banks = await listBanks.execute();
    expect(banks).toEqual([bank1, bank2]);
  });
});
