import { celebrate, Joi, Segments } from 'celebrate';

const createTransactionValidator = celebrate({
  [Segments.BODY]: {
    note: Joi.string().required(),
    title: Joi.string().required(),
    transactionType: Joi.string().required(),
    value: Joi.number().required(),
    fromBankAccountId: Joi.string().required(),
    symbolCoin: Joi.string().required(),
    toBankAccountId: Joi.string(),
    date: Joi.string().required(),
  },
});

export default createTransactionValidator;
