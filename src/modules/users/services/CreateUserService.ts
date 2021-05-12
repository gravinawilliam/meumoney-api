import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '@modules/users/interfaces/dtos/ICreateUserDTO';
import IUser from '@modules/users/interfaces/models/IUser';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/interfaces/IHashProvider';
import IValidatorEmailProvider from '@shared/container/providers/ValidatorEmailProvider/interfaces/IValidatorEmailProvider';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('ValidatorEmailProvider')
    private validatorEmailProvider: IValidatorEmailProvider,
  ) {}

  public async execute({
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<IUser> {
    const emailIsValid = await this.validatorEmailProvider.isValid(email);
    if (!emailIsValid) {
      throw new AppError('Email is not valid');
    }

    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('A user with this email already exists.', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
