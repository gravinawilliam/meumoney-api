import { v4 } from 'uuid';
import Bank from '../infra/typeorm/entities/Bank';
import ICreateBankDTO from '../interfaces/dtos/ICreateBankDTO';
import IBank from '../interfaces/models/IBank';
import IBanksRepository from '../interfaces/repositories/IBanksRepository';

export default class FakeBanksRepository implements IBanksRepository {
  private users: IBank[] = [];

  public async create(bank: ICreateBankDTO): Promise<IBank> {
    const bankCreated = Object.assign(new Bank(), {
      id: v4(),
      ...bank,
    });
    this.users.push(bankCreated);
    return bankCreated;
  }
}
