const {walletSchema, depositSchema} = require('../validationSchema');
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

const validateDeposits = async (req, res, next) => {
    const { amount } = req.body;
    const {error:err, value} = await depositSchema.validate({ amount });

    if (err){
        console.log(err);
        return errorMessage(res, 400, `Error! cannot make deposit, ${err.message}`);
    }

    req.depositAmount = value;
    next();
}



module.exports = {
    validateDeposits,
    validateInputs
}