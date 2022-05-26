const { Router } =  require('express');
const userRouter =  require('./Users/routes')

const router = Router()

router.use(userRouter);


module.exports = router;







