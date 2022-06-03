const Transaction = require('../models')
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const TransactionController = {
    getWalletTransactions: async (req, res) => {
        const wallet = req.wallet[0];
        const user_id = req.user.id;

        try{
            const wallet_transaction = await Transaction.getWalletTransactionByID(wallet.id, user_id);
            console.log(wallet_transaction.map(transaction => transaction.toJSON()));
            successResponse(res, 200, "Here you go.", wallet_transaction);
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred.");
        }
    }
}


module.exports = TransactionController;