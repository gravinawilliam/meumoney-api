import { container } from 'tsyringe';
import BCryptHashProvider from './implementations/BCryptHashProvider';
import IHashProvider from './interfaces/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
