import { compare, hash } from 'bcryptjs';
import IHashProvider from '../interfaces/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 10);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
