const { Router } = require('express');
const walletDepositController = require('../controllers');
const verifyToken = require("../../../middleware/auth");
const verifyWallet = require('../../../middleware/verifyWallet')
const validateDeposits = require('../validators');


const depositRouter = Router();

depositRouter.use(verifyToken);

// TODO
depositRouter
    .route('/api/wallets/:id/deposits')
    .post(verifyWallet, validateDeposits, walletDepositController.makeDeposit)
    .get(verifyWallet, walletDepositController.getDeposits);


depositRouter.route('/api/wallets/:source_wallet_id/deposits/:deposit_id')
    .get(verifyWallet, walletDepositController.getDepositDetails);


module.exports = depositRouter;