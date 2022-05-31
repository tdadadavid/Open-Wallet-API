const Wallet = require('../models/Wallets')

const TransactionController = {

    makeDeposit: async (req, res) => {
        const { amount } = req.depositAmount;
        const wallet_id = req.params.id;

        // try{
        //     const status = await Wallet.deposit(amount, source_wallet_id);
        // }

    }

}


module.exports = TransactionController;