const { Router } =  require('express');
const userRouter =  require('./Users/routes');
const walletsRouter = require('./Wallets/routes');

const router = Router()

router.use(userRouter);
router.use(walletsRouter);


module.exports = router;







