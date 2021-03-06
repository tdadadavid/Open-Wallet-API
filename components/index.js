const { Router } =  require('express');
const userRouter =  require('./Users/routes');
const walletsRouter = require('./Wallets/routes');
const depositRouter =require('./Deposits/routes');
const withdrawalRouter = require('./Withdrawals/routes');
const transferRouter = require('./Transfers/routes');
const transactionRouter = require('./Transactions/routes');

const router = Router()

router.use(userRouter);
router.use(walletsRouter);
router.use(depositRouter);
router.use(withdrawalRouter);
router.use(transferRouter);
router.use(transactionRouter);


module.exports = router;







