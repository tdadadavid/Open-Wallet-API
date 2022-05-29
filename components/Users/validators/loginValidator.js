const loginSchema = require('../validationSchemas/loginSchema');
const {errorMessage} = require("../../../utils/apiResponses");

const validateInputs = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error, value } = await loginSchema.validate({
            email,
            password,
        });

        if (error){
            console.log(error);
            return errorMessage(res, 400, error.message);
        }

        req.userInputs = value;
        next();
    }catch (err){
        console.log(err);
        return errorMessage(res, 400, err.toString());
    }
}

module.exports = validateInputs;