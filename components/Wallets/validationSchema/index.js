const Joi = require('joi');

const walletSchema = Joi.object({
    currency:  Joi.string().min(3).max(3).case('upper').required()
});


module.exports = walletSchema;