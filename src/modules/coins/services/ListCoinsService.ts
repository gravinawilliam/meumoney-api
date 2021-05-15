import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICoin from '../interfaces/models/ICoin';
import ICoinsRepository from '../interfaces/repositories/ICoinsRepository';

@injectable()
export default class ListCoinsService {
  constructor(
    @inject('CoinsRepository')
    private coinsRepository: ICoinsRepository,
  ) {}

  public async execute(): Promise<ICoin[]> {
    const coins = await this.coinsRepository.findCoins(9);
    return coins;
  }
}
