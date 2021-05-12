import { hash } from 'bcryptjs';
import IHashProvider from '../interfaces/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 10);
  }
}
