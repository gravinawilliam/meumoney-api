import { celebrate, Joi, Segments } from 'celebrate';

const deleteUserValidator = celebrate({
  [Segments.QUERY]: {
    password: Joi.string().min(6).required(),
  },
});

export default deleteUserValidator;
