const { Router } = require('express');
const validateInputs = require('../validators');
const transferController = require('../controllers');
const verifyWallet = require("../../../middleware/verifyWallet");
const verifyToken = require("../../../middleware/auth");



const transferRouter = Router();

transferRouter.use(verifyToken);

transferRouter
    .route('/api/wallets/:id/transfers')
    .post(verifyWallet,validateInputs, transferController.makeTransfer)
    .get(verifyWallet, transferController.getAllTransfers);



module.exports = transferRouter;