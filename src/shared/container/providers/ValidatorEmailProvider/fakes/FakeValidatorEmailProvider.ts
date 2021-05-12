import IValidatorEmailProvider from '../interfaces/IValidatorEmailProvider';

export default class FakeValidatorEmailProvider
  implements IValidatorEmailProvider
{
  public async isValid(email: string): Promise<boolean> {
    const regExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    return regExp.test(email);
  }
}
