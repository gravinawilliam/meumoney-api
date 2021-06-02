import { celebrate, Joi, Segments } from 'celebrate';

const deleteTransactionValidator = celebrate({
  [Segments.PARAMS]: {
    transactionId: Joi.string().uuid().required(),
  },
});

export default deleteTransactionValidator;
