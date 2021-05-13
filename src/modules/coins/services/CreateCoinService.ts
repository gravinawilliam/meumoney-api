import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICoin from '../interfaces/models/ICoin';
import ICreateCoinDTO from '../interfaces/dtos/ICreateCoinDTO';
import ICoinsRepository from '../interfaces/repositories/ICoinsRepository';

@injectable()
export default class CreateCoinService {
  constructor(
    @inject('CoinsRepository')
    private coinsRepository: ICoinsRepository,
  ) {}

  public async execute({ name, symbol }: ICreateCoinDTO): Promise<ICoin> {
    const coin = await this.coinsRepository.create({
      name,
      symbol,
    });
    return coin;
  }
}
