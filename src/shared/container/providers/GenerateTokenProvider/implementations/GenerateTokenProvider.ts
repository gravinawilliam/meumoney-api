import IGenerateTokenProvider from '../models/IGenerateTokenProvider';

export default class GenerateTokenProvider implements IGenerateTokenProvider {
  public generate(quantityNumbers: number): string {
    const add = 1;
    let max = 12 - add;

    if (quantityNumbers > max) {
      return this.generate(max) + this.generate(quantityNumbers - max);
    }

    max = 10 ** (quantityNumbers + add);
    const min = max / 10;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;

    return `${number}`.substring(add);
  }
}
