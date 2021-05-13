import { inject, injectable } from 'tsyringe';
import IBanksRepository from '../interfaces/repositories/IBanksRepository';
import IBank from '../interfaces/models/IBank';

@injectable()
export default class ListBanksService {
  constructor(
    @inject('BanksRepository')
    private banksRepository: IBanksRepository,
  ) {}

  public async execute(): Promise<IBank[]> {
    const bank = await this.banksRepository.findAll();
    return bank;
  }
}
