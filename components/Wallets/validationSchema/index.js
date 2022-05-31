const Joi = require('joi');

const walletSchema = Joi.object({
    currency:  Joi.string().min(3).max(3).case('upper').required()
});

const depositSchema = Joi.object({
    amount: Joi.number().min(100).max(100000000).required()
});

module.exports = {
    walletSchema,
    depositSchema
};