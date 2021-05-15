import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICoin from '../interfaces/models/ICoin';
import ICoinsRepository from '../interfaces/repositories/ICoinsRepository';

interface IRequest {
  amountCoins: number;
}

@injectable()
export default class ListCoinsService {
  constructor(
    @inject('CoinsRepository')
    private coinsRepository: ICoinsRepository,
  ) {}

  public async execute({ amountCoins }: IRequest): Promise<ICoin[]> {
    const coins = await this.coinsRepository.findCoins(amountCoins);
    return coins;
  }
}
