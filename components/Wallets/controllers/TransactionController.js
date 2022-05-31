const Deposit = require('../models/Deposit');
const Wallet = require('../models/Wallet');
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const DepositController = {

    makeDeposit: async (req, res) => {

        const { amount } = req.depositAmount;
        let wallet = req.wallet[0];

        console.log(wallet);

        const transaction = new Deposit(+amount, wallet.id);

        // update the value of the wallet here in javascript while the triggers
        // in sql will update it at database level, because of fast performance

        wallet.amount = parseFloat(wallet.amount) + amount;

        try {
            const status = await Deposit.deposit(transaction);
            if(!status) return errorMessage(res, 500, "Unable to perform deposit");
            return successResponse(res, 201, "Transaction [deposit] successful", wallet.toJSON());
        }catch (err){
            console.log(err);
            errorMessage(res, 500, "Oops! an  error occurred");
        }

    },

    getDeposits: async (req, res) => {
        const wallet = req.wallet[0];

        // find all deposits transaction done
        // to this particular wallet by using the
        // wallet id

        try{
            const wallet_deposits = await Deposit.getDepositsByWalletID(wallet.id);
            if (!wallet_deposits) return errorMessage(res, 404, "No deposit has been made to this wallet");
            return successResponse(res, 200, "Here you go. Transactions [deposits]", wallet_deposits[0].toJSON());
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred");
        }
    }

}


module.exports = DepositController;