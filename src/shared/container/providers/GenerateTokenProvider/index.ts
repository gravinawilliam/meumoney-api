import { container } from 'tsyringe';
import GenerateTokenProvider from './implementations/GenerateTokenProvider';
import IGenerateTokenProvider from './models/IGenerateTokenProvider';

container.registerSingleton<IGenerateTokenProvider>(
  'GenerateTokenProvider',
  GenerateTokenProvider,
);
