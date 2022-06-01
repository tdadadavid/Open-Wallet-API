const { Router } = require('express');
const validateInputs = require('../validators');
const transferController = require('../controllers');
const verifyWallet = require("../../../middleware/verifyWallet");



const transferRouter = Router();

transferRouter
    .route('/api/wallets/:id/transfers')
    .post(verifyWallet,validateInputs, transferController.makeTransfer);



module.exports = transferRouter;