const { Router } = require('express');
const userController = require('../controllers');
const ensureUniqueEmail = require('../../../middleware/ensureUniqueEmail');
const verifyToken = require('../../../middleware/auth')
const validateNewUserInputs = require('../validators/SignUpValidator');
const validateInputs = require('../validators/loginValidator')


const userRouter = Router();

userRouter.post('/api/auth/users',validateNewUserInputs, ensureUniqueEmail, userController.signUp);
userRouter.post('/api/auth/users/login',verifyToken, validateInputs, userController.login)


module.exports = userRouter;