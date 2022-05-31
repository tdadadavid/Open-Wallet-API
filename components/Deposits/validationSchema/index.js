const Joi = require("joi")

const depositSchema = Joi.object({
    amount: Joi.number().min(100).max(100000000).required()
});

module.exports = depositSchema;