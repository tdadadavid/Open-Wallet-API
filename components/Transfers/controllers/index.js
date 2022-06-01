const Transfer = require('../models')
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const TransferController = {
    makeTransfer: async (req, res) => {
        const { destination_wallet, wallet, amount } = req;

        wallet[0].amount = parseFloat(wallet[0].amount) - amount;
        const transaction = new Transfer(amount, wallet[0].id, destination_wallet[0].id);

        try {
            await Transfer.transfer(transaction);
            console.log(wallet);
            successResponse(res, 201, "Transaction [transfer] successful", wallet[0].toJSON());
        }catch (err) {
            console.log(err);
            errorMessage(res, 500, "Oops! an error occurred.");
        }


    }
}


module.exports = TransferController;