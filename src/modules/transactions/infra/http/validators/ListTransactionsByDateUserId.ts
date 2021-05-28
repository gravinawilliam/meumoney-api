import { celebrate, Joi, Segments } from 'celebrate';

const listTransactionsByDateUserIdValidator = celebrate({
  [Segments.QUERY]: {
    date: Joi.string().required(),
  },
});

export default listTransactionsByDateUserIdValidator;
