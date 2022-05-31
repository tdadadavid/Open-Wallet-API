const Transaction = require('../models/Transactions');
const Wallet = require('../models/Wallets');
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const TransactionController = {

    makeDeposit: async (req, res) => {

        const { amount } = req.depositAmount;
        let wallet = req.wallet[0];

        console.log(wallet);

        const transaction = new Transaction(amount, wallet.id);

        // update the value of the wallet here in javascript while the triggers
        // in sql will update it at database level, because of fast performance

        wallet.amount = parseFloat(wallet.amount) + amount;

        try {
            const status = await Transaction.deposit(transaction);
            if(!status) return errorMessage(res, 500, "Unable to perform deposit");
            return successResponse(res, 201, "Transaction [deposit] successful", wallet.toJSON());
        }catch (err){
            console.log(err);
            errorMessage(res, 500, "Oops! an  error occurred");
        }

    }

}


module.exports = TransactionController;