export default interface IValidatorEmailProvider {
  isValid(email: string): Promise<boolean>;
}
