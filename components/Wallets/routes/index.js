const { Router } = require('express');
const walletController = require('../controllers')
const walletDepositController = require('../controllers/TransactionController');
const verifyToken = require("../../../middleware/auth");
const verifyWallet = require('../../../middleware/verifyWallet')
const { validateInputs, validateDeposits } = require('../validators');


const walletRouter = Router();

walletRouter.use(verifyToken);

// TODO
walletRouter
    .route('/api/wallets')
    .post(validateInputs, walletController.createWallet)
    .get(walletController.getUserWallets);


// <!-- verify the wallet id -->
// TODO
// Refactor the getWallet and close wallet
// controller.

// TODO
walletRouter
    .route('/api/wallets/:id')
    .get(walletController.getWallet)
    .delete(walletController.closeWallet);


// TODO
walletRouter
    .route('/api/wallets/:id/deposits')
    .post(verifyWallet, validateDeposits, walletDepositController.makeDeposit)
    .get(verifyWallet, walletDepositController.getDeposits)

// TODO
// walletRouter
//     .get('/api/wallets/:source_wallet_id/deposit/:deposit_id', walletRouter.getDepositsHistory);

module.exports = walletRouter;