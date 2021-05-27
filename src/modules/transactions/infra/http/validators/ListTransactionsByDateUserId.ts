import { celebrate, Joi, Segments } from 'celebrate';

const listTransactionsByDateUserIdValidator = celebrate({
  [Segments.QUERY]: {
    date: Joi.string()
      .required()
      .regex(/^\d{4}-\d{2}-\d{2}$/),
  },
});

export default listTransactionsByDateUserIdValidator;
