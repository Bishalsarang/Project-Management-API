const Joi = require('@hapi/joi');

const taskSchema = Joi.object({
  // eslint-disable-next-line camelcase
  project_id: Joi.number().integer().required(),
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(500),
  deadline: Joi.date().required()
});

module.exports = taskSchema;
