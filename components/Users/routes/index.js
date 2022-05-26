const { Router } = require('express');
const userController = require('../controllers');
const authUser = require('../../../middleware/auth')
const validateNewUserInputs = require('../validators/SignUp');


const userRouter = Router();

userRouter
    .route('/api/auth/users')
    .post(validateNewUserInputs, authUser, userController.registerUser);


module.exports = userRouter;