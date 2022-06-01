const joi = require('joi');

const userRegistrationSchema = joi.object({
    firstname: joi.string().max(30).required(),
    lastname: joi.string().max(30).required(),
    email: joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "edu"] }
    }).required(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,12}$")).required(), //Todo
    confirm_password: joi.ref('password')
});


module.exports = userRegistrationSchema;