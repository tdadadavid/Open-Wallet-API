const Withdrawal = require('../models')
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const withdrawalsController = {

    makeWithdrawal: async (req, res) => {

        const current_wallet_balance = req.current_balance;
        const amount_to_be_withdrawn = req.amount;

        const wallet =  req.wallet[0];

        // update the value of the wallet here in javascript while the triggers
        // in sql will update it at database level, because of fast performance

        wallet.amount = current_wallet_balance - amount_to_be_withdrawn;

        const transaction = new  Withdrawal(+amount_to_be_withdrawn, wallet.id);

        try{
            const isSuccessful = Withdrawal.withdraw(transaction);
            if (!isSuccessful) return errorMessage("Unable to perform Transaction [withdraw]");
            return successResponse(res, 200, "Transaction [withdrawal] successful", wallet.toJSON())
        }catch (err) {
            console.log(err);
            errorMessage(res, 500, "Oops! an error occurred.");
        }

    },

    getAllWithdrawals: async (req, res) => {
        const wallet = req.wallet[0];

        try{
            const withdrawals = await Withdrawal.getWithdrawalsByWalletID(wallet.id);
            if (!withdrawals) return errorMessage(res, 404, "This wallet has no Transaction [withdraw].");
            return successResponse(res, 200, "Here you go.", withdrawals.map(withdrawal => withdrawal.toJSON()));
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred");
        }
    },

    getSpecificDeposit: async (req, res) => {
        const withdrawal_id = req.params.withdrawal_id;

        try{
            const withdrawal = await Withdrawal.getWithdrawalByID(withdrawal_id);
            if (!withdrawal) return errorMessage(res, 404, `No withdrawal with this id ${withdrawal_id} found.`);
            return successResponse(res, 200, "Here you go.", withdrawal.map(w => w.toJSON()));
        }catch (err) {
            console.log(err);
            errorMessage(res, 500, "Oops! an error occurred");
        }
    }
}








module.exports = withdrawalsController;