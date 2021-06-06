import { container } from 'tsyringe';
import BenfordAntiFraudProvider from './implementations/BenfordAntiFraudProvider';
import IAntiFraudProvider from './interfaces/IAntiFraudProvider';

container.registerSingleton<IAntiFraudProvider>(
  'AntiFraudProvider',
  BenfordAntiFraudProvider,
);
