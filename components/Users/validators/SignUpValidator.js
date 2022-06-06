const userRegistrationSchema = require('../validationSchemas/SignUpSchema');
const {errorMessage} = require("../../../utils/apiResponses");


const validateNewUserInputs = async (req, res, next) => {

    try{
        const { error: err , value } = await userRegistrationSchema.validate(req.body);
        if (err){
            console.log(err);
            errorMessage(res, 400, err.message);
            return;
        }

        req.inputs = value;

        next();
    }catch (e) {
        console.log(e);
        errorMessage(res, 500, "Oops! an error occurred.");
    }
}


module.exports = validateNewUserInputs;