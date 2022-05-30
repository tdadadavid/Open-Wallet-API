const walletSchema = require('../validationSchema');
const {errorMessage} = require("../../../utils/apiResponses");


const validateInputs = async (req, res, next) => {

    const { currency } = req.body;
    const { error:err, value } = await walletSchema.validate({ currency });

    if (err){
        console.log(err);
        return errorMessage(res, 400, "Invalid currency input");
    }

    req.currency = value;
    next();

}

module.exports = validateInputs;