import { celebrate, Joi, Segments } from 'celebrate';

const updateTransactionValidator = celebrate({
  [Segments.PARAMS]: {
    transactionId: Joi.string().uuid().required(),
  },
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

export default updateTransactionValidator;
