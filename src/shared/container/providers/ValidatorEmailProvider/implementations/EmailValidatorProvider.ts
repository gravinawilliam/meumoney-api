import * as EmailValidator from 'email-validator';
import IValidatorEmailProvider from '../interfaces/IValidatorEmailProvider';

export default class EmailValidatorProvider implements IValidatorEmailProvider {
  public async isValid(email: string): Promise<boolean> {
    return EmailValidator.validate(email);
  }
}
