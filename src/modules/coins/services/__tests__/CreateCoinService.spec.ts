import FakeCoinsRepository from '@modules/coins/fakes/FakeCoinsRepository';
import AppError from '@shared/errors/AppError';
import CreateCoinService from '../CreateCoinService';

let fakeCoinsRepository: FakeCoinsRepository;
let createCoin: CreateCoinService;

describe('CreateCoin', () => {
  beforeEach(() => {
    fakeCoinsRepository = new FakeCoinsRepository();
    createCoin = new CreateCoinService(fakeCoinsRepository);
  });

  it('should be able to create user', async () => {
    const coin = await createCoin.execute({
      name: 'Real',
      symbol: 'BRL',
    });
    expect(coin).toHaveProperty('id');
  });

  it('should be able to create user', async () => {
    await fakeCoinsRepository.create({
      name: 'Real',
      symbol: 'BRL',
    });

    await expect(
      createCoin.execute({
        name: 'Real',
        symbol: 'BRL',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
