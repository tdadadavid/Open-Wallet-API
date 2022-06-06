const Transaction = require('../models');
const generatePDF = require('../../../services/pdfMaker');
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const TransactionController = {
    getWalletTransactions: async (req, res) => {
        const wallet = req.wallet;
        const user_id = req.user.id;

        try{
            const wallet_transaction = await Transaction.getWalletTransactionByID(wallet.id, user_id);
            successResponse(res, 200, "Here you go.", wallet_transaction.map(transaction => transaction.toJSON()));
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred.");
        }
    },

    getWalletTransactionsAsPDF: async (req, res) => {
        const wallet = req.wallet;
        const user = req.user;

        try{

            const wallet_transactions = await Transaction.getWalletTransactionByID(wallet.id, user.id);

            const stream = res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment;filename=Transactions-history.pdf'
            });

            generatePDF(JSON.stringify(wallet_transactions.map(transaction => transaction.toJSON())),
                (chunk) => stream.write(chunk),
                () => stream.end()
            );

        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred.");
        }

    }
    
}


module.exports = TransactionController;