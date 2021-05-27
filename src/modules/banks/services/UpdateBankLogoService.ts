import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUpdateBankLogoDTO from '../interfaces/dtos/IUpdateBankLogoDTO';
import IBank from '../interfaces/models/IBank';
import IBanksRepository from '../interfaces/repositories/IBanksRepository';

@injectable()
export default class UpdateBankLogoService {
  constructor(
    @inject('BanksRepository')
    private banksRepository: IBanksRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ bankId, logo }: IUpdateBankLogoDTO): Promise<IBank> {
    const bank = await this.banksRepository.findById(bankId);
    if (!bank) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }
    if (bank.logo) {
      await this.storageProvider.deleteFile(bank.logo);
    }
    const fileName = await this.storageProvider.saveFile(logo);
    bank.logo = fileName;
    await this.banksRepository.save(bank);
    return bank;
  }
}
