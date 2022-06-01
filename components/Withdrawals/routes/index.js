const { Router } =  require('express');
const verifyWallet = require("../../../middleware/verifyWallet");



depositRouter = Router();


depositRouter.use(verifyWallet);


depositRouter
    .route('/api/wallets/:id/withdrawals')
    .post(validateInputs, withdrawalsController.makeWithdrawal);


module.exports = depositRouter;