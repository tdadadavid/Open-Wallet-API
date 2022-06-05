const { Router } = require('express');
const transactionController = require('../controllers');
const verifyWallet = require("../../../middleware/verifyWallet");
const verifyToken = require("../../../middleware/auth");


transactionRouter = Router();

transactionRouter.use(verifyToken);


transactionRouter
    .get('/api/wallets/:id/transactions', verifyWallet, transactionController.getWalletTransactions);


transactionRouter
    .get('/api/wallets/:id/transactions/download', verifyWallet, transactionController.getWalletTransactionsAsPDF)


module.exports = transactionRouter;