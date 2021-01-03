const Joi = require('joi');

const validations = {
  signupValidation: (data) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
  },
  signinValidation: (data) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return schema.validate(data);
  },
};

module.exports = validations;
