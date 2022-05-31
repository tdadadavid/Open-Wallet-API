const depositSchema = require("../validationSchema");
const {errorMessage} = require("../../../utils/apiResponses");


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

module.exports = validateDeposits;