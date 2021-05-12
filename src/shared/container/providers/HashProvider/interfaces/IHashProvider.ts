export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
}
