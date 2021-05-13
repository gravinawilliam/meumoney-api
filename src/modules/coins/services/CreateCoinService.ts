import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
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
    const nameExists = await this.coinsRepository.findByName(name);
    if (nameExists) {
      throw new AppError('A coin with this name already exists.', 409);
    }

    const symbolExists = await this.coinsRepository.findBySymbol(symbol);
    if (symbolExists) {
      throw new AppError('A coin with this symbol already exists.', 409);
    }

    const coin = await this.coinsRepository.create({
      name,
      symbol,
    });
    return coin;
  }
}
