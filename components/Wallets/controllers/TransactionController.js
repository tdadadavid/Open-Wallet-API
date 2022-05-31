const Transaction = require('../models/Transactions');
const Wallet = require('../models/Wallets');
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const TransactionController = {

    makeDeposit: async (req, res) => {

        const { amount } = req.depositAmount;
        const wallet_id = req.params.id;

        const transaction = new Transaction(amount, wallet_id, 'deposit');

        try {
            const status = await Transaction.deposit(transaction);
            if(!status) return errorMessage(res, 500, "Unable to perform deposit");

            const wallet = await Wallet.findByID(wallet_id);
            return successResponse(res, 201, "Transaction [deposit] successful", wallet[0].toJSON());
        }catch (err){
            console.log(err);
            errorMessage(res, 500, "Oops! an  error occurred");
        }

    }

}


module.exports = TransactionController;