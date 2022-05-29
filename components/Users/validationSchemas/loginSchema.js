const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().email({
        tlds: { allow: ["net", "com", "org", "edu"]},
        minDomainSegments: 2
    }).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,12}$")).required()
});

//TODO watch videos on regex to understand regex.

module.exports = loginSchema;