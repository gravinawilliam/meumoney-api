import { container } from 'tsyringe';
import EmailValidatorProvider from './implementations/EmailValidatorProvider';
import IValidatorEmailProvider from './interfaces/IValidatorEmailProvider';

container.registerSingleton<IValidatorEmailProvider>(
  'ValidatorEmailProvider',
  EmailValidatorProvider,
);
