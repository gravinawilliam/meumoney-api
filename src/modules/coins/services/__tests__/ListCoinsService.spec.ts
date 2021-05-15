import FakeCoinsRepository from '@modules/coins/fakes/FakeCoinsRepository';
import ListCoinsService from '../ListCoinsService';

let fakeCoinsRepository: FakeCoinsRepository;
let listCoins: ListCoinsService;

describe('ListCoins', () => {
  beforeEach(() => {
    fakeCoinsRepository = new FakeCoinsRepository();
    listCoins = new ListCoinsService(fakeCoinsRepository);
  });

  it('should be able to list coins', async () => {
    const coin1 = await fakeCoinsRepository.create({
      name: 'Real',
      symbol: 'BRL',
    });
    const coin2 = await fakeCoinsRepository.create({
      name: 'Euro',
      symbol: 'EUR',
    });
    const coin3 = await fakeCoinsRepository.create({
      name: 'Dolar',
      symbol: 'USD',
    });
    const coin4 = await fakeCoinsRepository.create({
      name: 'Pound Sterling',
      symbol: 'GBP',
    });
    const coin5 = await fakeCoinsRepository.create({
      name: 'Bitcoin',
      symbol: 'BTC',
    });
    const coin6 = await fakeCoinsRepository.create({
      name: 'Japanese Yen',
      symbol: 'JPY',
    });
    const coin7 = await fakeCoinsRepository.create({
      name: 'Australian Dollar',
      symbol: 'AUD',
    });
    const coin8 = await fakeCoinsRepository.create({
      name: 'Canadian Dollar',
      symbol: 'CAD',
    });
    const coin9 = await fakeCoinsRepository.create({
      name: 'Argentine Peso',
      symbol: 'ARS',
    });
    const coins = await listCoins.execute({
      amountCoins: 9,
    });
    expect(coins).toEqual([
      coin1,
      coin2,
      coin3,
      coin4,
      coin5,
      coin6,
      coin7,
      coin8,
      coin9,
    ]);
  });
});
