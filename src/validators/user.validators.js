const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required()
});

module.exports = userSchema;
