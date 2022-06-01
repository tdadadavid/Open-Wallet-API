const Joi = require('joi');

const withdrawalSchema = Joi.object({
    amount: Joi.number().min(100).max(100_000_000).required()
});

module.exports = withdrawalSchema;