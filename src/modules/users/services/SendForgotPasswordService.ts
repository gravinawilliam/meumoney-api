import { inject, injectable } from 'tsyringe';
import path from 'path';
import IUsersRepository from '@modules/users/interfaces/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IGenerateTokenProvider from '@shared/container/providers/GenerateTokenProvider/models/IGenerateTokenProvider';
import { NOT_FOUND } from '@shared/constants/HttpStatusCode';
import IValidatorEmailProvider from '@shared/container/providers/ValidatorEmailProvider/interfaces/IValidatorEmailProvider';
import AppError from '../../../shared/errors/AppError';
import ISendForgotPasswordEmailDTO from '../interfaces/dtos/ISendForgotPasswordEmailDTO';
import IUserTokensRepository from '../interfaces/repositories/IUserTokensRepository';

@injectable()
export default class SendForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('GenerateTokenProvider')
    private generateTokenProvider: IGenerateTokenProvider,
    @inject('ValidatorEmailProvider')
    private validatorEmailProvider: IValidatorEmailProvider,
  ) {}

  public async execute({ email }: ISendForgotPasswordEmailDTO): Promise<void> {
    const emailIsValid = await this.validatorEmailProvider.isValid(email);
    if (!emailIsValid) {
      throw new AppError('Email is not valid');
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found.', NOT_FOUND);
    }

    const token = this.generateTokenProvider.generate(4);

    const checkUserTokenExists = await this.userTokensRepository.findByEmail(
      email,
    );
    if (!checkUserTokenExists) {
      await this.userTokensRepository.create({
        email,
        token,
      });
    } else {
      checkUserTokenExists.token = token;
      await this.userTokensRepository.save(checkUserTokenExists);
    }

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: '[MeuMoney] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
