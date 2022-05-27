const { Router } = require('express');
const userController = require('../controllers');
const ensureUniqueEmail = require('../../../middleware/auth')
const validateNewUserInputs = require('../validators/SignUp');


const userRouter = Router();

userRouter
    .route('/api/auth/users')
    .post(validateNewUserInputs, ensureUniqueEmail, userController.signUp);


//TODO
userRouter
    .route('/api/auth/users/login')
    .post(validateInputs, auth, userController.login)

module.exports = userRouter;