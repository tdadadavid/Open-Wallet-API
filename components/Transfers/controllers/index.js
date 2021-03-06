const Transfer = require('../models');
const currencyConverter = require('../../../services/exchangeRates')
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const TransferController = {

    makeTransfer: async (req, res) => {
        let { destination_wallet, wallet, amount } = req;

        wallet.amount = parseFloat(wallet.amount) - amount;

        let destination_wallet_currency = destination_wallet[0].currency;
        let source_wallet_currency = wallet.currency;

        try {

            let response = destination_wallet_currency !== source_wallet_currency
                ? await currencyConverter.getConversion(source_wallet_currency, destination_wallet_currency, +amount)
                : "";

            //TODO check if the currency does not exist
            const convertedAmount = response.result ?? amount

            const transaction = new Transfer(+amount, wallet, destination_wallet[0], +convertedAmount);
            await Transfer.transfer(transaction);
            successResponse(res, 201, "Transaction [transfer] successful", wallet.toJSON());
        } catch (err) {
            console.log(err);
            errorMessage(res, 500, "Oops! an error occurred.");
        }


    },

    getAllTransfers: async (req, res) => {
        const wallet_id = req.wallet.id;

        try{
            const allTransfers = await Transfer.findBySourceWalletID(wallet_id);
            if (!allTransfers) return errorMessage(res, 404, "Wallet has no Transaction [transfer]");
            successResponse(res, 200, "Here you go.", allTransfers.map(transfer => transfer.toJSON()));
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred.");
        }
    },

    getSpecificTransfer: async (req, res) => {
        const { transfer_id } = req.params;
        const wallet_id = req.wallet.id;

        try{
            const transfer = await Transfer.findByTransferID(transfer_id,  wallet_id);
            if (!transfer) return errorMessage(res, 404, "Transaction [transfer] does not exists");
            successResponse(res, 200, "Here you go.", transfer[0].toJSONSpecific());
        }catch (err){
            console.log(err);
            errorMessage(res, 500, "Oops! an error occurred.");
        }
    }
}


module.exports = TransferController;