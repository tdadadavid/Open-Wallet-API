const { Router } = require('express');
const walletController = require('../controllers')
const verifyToken = require("../../../middleware/auth");
const validateInputs = require('../validators');


const walletRouter = Router();

walletRouter.use(verifyToken);

walletRouter
    .route('/api/wallets')
    .post(validateInputs, walletController.createWallet)
    .get(walletController.getUserWallets)


// walletRouter
//     .route('/:id')
//     .get(walletController.getWallet)
//     .delete(validateInputs, walletController.closeWallet);
//
// walletRouter
//     .route('/:id/deposits')
//     .post(depositSchema, walletController.makeDeposit)
//     .get(walletRouter.getDeposits)
//
// walletRouter.get('/:id/deposit/:id', walletRouter.getDepositsHistory);


module.exports = walletRouter;