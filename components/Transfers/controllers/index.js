const Transfer = require('../models');
const currencyConverter = require('../../../thirdPartyServices/exchangeRates')
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const TransferController = {
    makeTransfer: async (req, res) => {
        let { destination_wallet, wallet, amount } = req;

        wallet[0].amount = parseFloat(wallet[0].amount) - amount;

        let destination_wallet_currency = destination_wallet[0].currency;
        let source_wallet_currency = wallet[0].currency;


        try {

            let response = destination_wallet_currency !== source_wallet_currency
                ? await currencyConverter.getConversion(source_wallet_currency, destination_wallet_currency, +amount)
                : "";

            const convertedAmount = response.result ?? amount

            const transaction = new Transfer(+amount, wallet[0], destination_wallet[0], +convertedAmount);
            await Transfer.transfer(transaction);
            successResponse(res, 201, "Transaction [transfer] successful", wallet[0].toJSON());
        } catch (err) {
            console.log(err);
            errorMessage(res, 500, "Oops! an error occurred.");
        }


    }
}


module.exports = TransferController;