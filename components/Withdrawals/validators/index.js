const withdrawalSchema = require('../validationSchema');
const {errorMessage} = require("../../../utils/apiResponses");


const validateInputs = async (req, res, next) => {
    const { amount } = req.body;

    const minimum_withdrawal_amount = 100;
    const maximum_withdrawal_amount = 100_000_000;

    try {

        const {error: err, value} = await withdrawalSchema.validate({amount});
        if (err) {
            console.log(err);
            return errorMessage(res, 400, `Error! ${err.message}`);
        }

        // check if the amount to be withdrawn is greater than available amount in wallet
        const current_balance = parseFloat(req.wallet[0].amount);
        // console.log(current_balance, " before withdrawals");
        if (value.amount > current_balance)
            return errorMessage(res, 400, "Error! insufficient wallet balance");

        req.amount = value.amount;
        req.current_balance = current_balance;

        next()
    }catch(err){
        console.log(err);
        errorMessage(res, 500, "Oops! an error occurred.");
    }
}

module.exports = validateInputs;