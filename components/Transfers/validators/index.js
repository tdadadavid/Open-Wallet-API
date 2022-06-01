const transferSchema = require('../validationSchema');
const {errorMessage} = require("../../../utils/apiResponses");
const Wallet = require("../../Wallets/models/Wallet");

const validateInputs = async (req, res, next) => {

    const { amount, destination_wallet_id } = req.body;

    try{
        const { error:err, value } = transferSchema.validate({
            amount,
            destination_wallet_id
        });

        if (err){
            console.log(err);
            return errorMessage(res, 400, `Error! ${err.message}`);
        }

        // check for the destination_wallet id
        const destination_wallet  = await Wallet.findByID(destination_wallet_id);
        if (!destination_wallet) return errorMessage(res, 404, "Destination wallet does not exists.");

        // TODO put this into an helper function called 'balanceIsInsufficient'
        const wallet_balance = parseFloat(req.wallet[0].amount);
        if (wallet_balance < amount){
            return errorMessage(res, 400, "Insufficient wallet balance");
        }

        req.destination_wallet = destination_wallet;
        req.amount = parseFloat(value.amount);

        next();
    }catch (e) {
        console.log(e);
        errorMessage(res, 500, "Oops! an error occurred.");
    }

}

module.exports = validateInputs;