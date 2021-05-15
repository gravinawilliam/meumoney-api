import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import axios from 'axios';
import { format } from 'date-fns';
import ICoin from '../interfaces/models/ICoin';
import ICoinsRepository from '../interfaces/repositories/ICoinsRepository';

interface ISaveCoin {
  coinsRepository: ICoinsRepository;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coin: any;
  symbol: string;
}

async function saveCoin({ coin, coinsRepository, symbol }: ISaveCoin) {
  const foundCoin: ICoin | undefined = await coinsRepository.findByName(
    coin.name,
  );
  if (foundCoin) {
    const dateFoundCoin = format(foundCoin.createdAt, 'dd/MM/yyyy');
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    if (dateFoundCoin === currentDate) {
      foundCoin.buy = coin.buy;
      foundCoin.sell = coin.sell;
      await coinsRepository.save(foundCoin);
    } else {
      await coinsRepository.create({
        name: coin.name,
        symbol,
        buy: coin.buy,
        sell: coin.sell,
      });
    }
  } else {
    await coinsRepository.create({
      name: coin.name,
      symbol,
      buy: coin.buy,
      sell: coin.sell,
    });
  }
}

@injectable()
export default class CreateCoinService {
  constructor(
    @inject('CoinsRepository')
    private coinsRepository: ICoinsRepository,
  ) {}

  public async execute(): Promise<boolean> {
    try {
      const coins = await axios.get('https://api.hgbrasil.com/finance');
      const { GBP, ARS, CAD, AUD, JPY, CNY, BTC, EUR, USD } =
        coins.data.results.currencies;

      await saveCoin({
        coin: GBP,
        coinsRepository: this.coinsRepository,
        symbol: 'GBP',
      });
      await saveCoin({
        coin: ARS,
        coinsRepository: this.coinsRepository,
        symbol: 'ARS',
      });
      await saveCoin({
        coin: CAD,
        coinsRepository: this.coinsRepository,
        symbol: 'CAD',
      });
      await saveCoin({
        coin: AUD,
        coinsRepository: this.coinsRepository,
        symbol: 'AUD',
      });
      await saveCoin({
        coin: JPY,
        coinsRepository: this.coinsRepository,
        symbol: 'JPY',
      });
      await saveCoin({
        coin: CNY,
        coinsRepository: this.coinsRepository,
        symbol: 'CNY',
      });
      await saveCoin({
        coin: BTC,
        coinsRepository: this.coinsRepository,
        symbol: 'BTC',
      });
      await saveCoin({
        coin: EUR,
        coinsRepository: this.coinsRepository,
        symbol: 'EUR',
      });
      await saveCoin({
        coin: USD,
        coinsRepository: this.coinsRepository,
        symbol: 'USD',
      });

      return true;
    } catch (error) {
      throw new AppError(`${error}`);
    }
  }
}
