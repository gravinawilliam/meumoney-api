import { inject, injectable } from 'tsyringe';
import Bank from '../infra/typeorm/entities/Bank';
import AppError from '../../../shared/errors/AppError';
import IBanksRepository from '../interfaces/repositories/IBanksRepository';
import ICreateBankDTO from '../interfaces/dtos/ICreateBankDTO';

@injectable()
export default class CreateBankService {
  constructor(
    @inject('BanksRepository')
    private banksRepository: IBanksRepository,
  ) {}

  public async execute({
    name,
    blueColorCard,
    greenColorCard,
    redColorCard,
  }: ICreateBankDTO): Promise<Bank> {
    const checkNameExists = await this.banksRepository.findByName(name);
    if (checkNameExists) {
      throw new AppError('O nome de banco já existe');
    }
    const bank = await this.banksRepository.create({
      name,
      blueColorCard,
      greenColorCard,
      redColorCard,
    });
    return bank;
  }
}
