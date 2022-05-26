const userRegistrationSchema = require('../validationSchemas/SignUp');


const validateNewUserInputs = async (req, res, next) => {

    try{
        const { error: err , value } = await userRegistrationSchema.validate(req.body);
        if (err){
            console.log(err);
            res.status(400).json({
                status: 400,
                message: err.message
            });
            return;
        }

        req.inputs = value;

        next();
    }catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Oops! an error occurred."
        });
    }
}


module.exports = validateNewUserInputs;