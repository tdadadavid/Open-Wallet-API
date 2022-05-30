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


//TODO
walletRouter
    .route('/api/wallets/:id')
    .get(walletController.getWallet)
    // .delete(validateInputs, walletController.closeWallet);

//TODO
// walletRouter
//     .route('/api/wallets/:id/deposits')
//     .post(depositSchema, walletController.makeDeposit)
//     .get(walletRouter.getDeposits)

//TODO
// walletRouter.get('/api/wallets/:id/deposit/:id', walletRouter.getDepositsHistory);


module.exports = walletRouter;