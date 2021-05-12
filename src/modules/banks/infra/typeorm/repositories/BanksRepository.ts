import ICreateBankDTO from '@modules/banks/interfaces/dtos/ICreateBankDTO';
import IBank from '@modules/banks/interfaces/models/IBank';
import IBanksRepository from '@modules/banks/interfaces/repositories/IBanksRepository';
import { getRepository, Repository } from 'typeorm';
import Bank from '../entities/Bank';

export default class BanksRepository implements IBanksRepository {
  private ormRepository: Repository<IBank>;

  constructor() {
    this.ormRepository = getRepository(Bank);
  }

  public async create(bank: ICreateBankDTO): Promise<IBank> {
    const bankCreated = this.ormRepository.create(bank);
    await this.ormRepository.save(bankCreated);
    return bankCreated;
  }

  public async findAll(): Promise<IBank[]> {
    const foundBanks = await this.ormRepository.find();
    return foundBanks;
  }

  public async findByName(name: string): Promise<IBank | undefined> {
    const foundBank = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return foundBank;
  }
}
