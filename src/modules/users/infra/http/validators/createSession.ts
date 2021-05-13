import { celebrate, Joi, Segments } from 'celebrate';

const createSessionValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  },
});

export default createSessionValidator;
