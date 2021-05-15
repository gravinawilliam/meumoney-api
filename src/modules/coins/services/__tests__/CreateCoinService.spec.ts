import FakeCoinsRepository from '@modules/coins/fakes/FakeCoinsRepository';
import CreateCoinService from '../CreateCoinService';

let fakeCoinsRepository: FakeCoinsRepository;
let createCoin: CreateCoinService;

describe('CreateCoin', () => {
  beforeEach(() => {
    fakeCoinsRepository = new FakeCoinsRepository();
    createCoin = new CreateCoinService(fakeCoinsRepository);
  });

  it('should be able to create coin', async () => {
    const coin = await createCoin.execute();
    expect(coin).toBe(true);
  });
});
