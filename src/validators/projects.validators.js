const Joi = require('@hapi/joi');

const projectSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(500)
});

module.exports = projectSchema;
