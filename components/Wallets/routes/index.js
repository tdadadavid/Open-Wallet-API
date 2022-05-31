const { Router } = require('express');
const walletController = require('../controllers')
const walletDepositController = require('../controllers/TransactionController');
const verifyToken = require("../../../middleware/auth");
const { validateInputs, validateDeposits } = require('../validators');


const walletRouter = Router();

walletRouter.use(verifyToken);

// TODO
walletRouter
    .route('/api/wallets')
    .post(validateInputs, walletController.createWallet)
    .get(walletController.getUserWallets);




// TODO
walletRouter
    .route('/api/wallets/:id')
    .get(walletController.getWallet)
    .delete(walletController.closeWallet);

// TODO
walletRouter
    .route('/api/wallets/:id/deposits')
    .post(validateDeposits, walletDepositController.makeDeposit)
    // .get(walletDepositController.getDeposits)

// TODO
// walletRouter
//     .get('/api/wallets/:source_wallet_id/deposit/:deposit_id', walletRouter.getDepositsHistory);

module.exports = walletRouter;