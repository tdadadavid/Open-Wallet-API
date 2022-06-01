const Joi = require('joi');

const transferSchema = Joi.object({
    amount: Joi.number().min(100).max(10_000_000).required(),
    destination_wallet_id: Joi.string().required(),
});


module.exports = transferSchema;