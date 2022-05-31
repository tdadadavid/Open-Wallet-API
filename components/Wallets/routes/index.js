const { Router } = require('express');
const walletController = require('../controllers')
const verifyToken = require("../../../middleware/auth");
const validateInputs = require('../validators');


const walletRouter = Router();

walletRouter.use(verifyToken);

// TODO
walletRouter
    .route('/api/wallets')
    .post(validateInputs, walletController.createWallet)
    .get(walletController.getUserWallets);


// // <!-- verify the wallet id -->
// TODO
// Refactor the getWallet and close wallet
// controller.

// TODO
walletRouter
    .route('/api/wallets/:id')
    .get(walletController.getWallet)
    .delete(walletController.closeWallet);



module.exports = walletRouter;