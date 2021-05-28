import FakeBanksRepository from '@modules/banks/fakes/FakeBanksRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateBankLogoService from '../UpdateBankLogoService';

let fakeBanksRepository: FakeBanksRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateBankLogo: UpdateBankLogoService;

describe('Update Bank Logo', () => {
  beforeEach(() => {
    fakeBanksRepository = new FakeBanksRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateBankLogo = new UpdateBankLogoService(
      fakeBanksRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update bank logo', async () => {
    const bank = await fakeBanksRepository.create({
      name: 'Nubank',
      blueColorCard: 211,
      greenColorCard: 123,
      redColorCard: 31,
    });
    const updatedBankLogo = await updateBankLogo.execute({
      bankId: bank.id,
      logo: 'logo.jpg',
    });
    expect(updatedBankLogo.logo).toBe('logo.jpg');
  });

  it('you must be able to update the bank logo even if you have another registered', async () => {
    const bank = await fakeBanksRepository.create({
      name: 'Nubank',
      blueColorCard: 211,
      greenColorCard: 123,
      redColorCard: 31,
    });
    await updateBankLogo.execute({
      bankId: bank.id,
      logo: 'logo.jpg',
    });
    const updatedBankLogo = await updateBankLogo.execute({
      bankId: bank.id,
      logo: 'logo2.jpg',
    });
    expect(updatedBankLogo.logo).toBe('logo2.jpg');
  });
});
