const { Router } =  require('express');
const verifyWallet = require("../../../middleware/verifyWallet");
const validateInputs = require('../validators');
const withdrawalsController = require('../controllers');
const verifyToken = require("../../../middleware/auth");



withdrawalRouter = Router();

withdrawalRouter.use(verifyToken);
// withdrawalRouter.use();

withdrawalRouter
    .get(
        '/api/wallets/:id/withdrawals/:withdrawal_id',
        verifyWallet,
        withdrawalsController.getSpecificDeposit
    );

withdrawalRouter
    .route('/api/wallets/:id/withdrawals')
    .post(verifyWallet,validateInputs, withdrawalsController.makeWithdrawal)
    .get(verifyWallet, withdrawalsController.getAllWithdrawals);


module.exports = withdrawalRouter;