const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../../../utils/tokens');
const { hashUserPassword, successMessage, errorResponse, errorMessage, successResponse} = require('../../../utils/helpers');

const UserController = {

    async registerUser(req, res){

        const inputs = req.inputs;

        //hash user password
        const password = await hashUserPassword(inputs.password);

        //instantiate user
        const newUser = new User(inputs.firstname, inputs.lastname, inputs.email, password);

        //generate user token
        const token = await generateAccessToken(newUser.id);

        //assign refresh token to user
        newUser.token = await generateRefreshToken(newUser.id);

        //assign the access token to the headers
        res.header('auth-token', token);

        try{
            const user = await User.save(newUser);
            successResponse(res, 201, "New user registered", user[0]);
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred");
        }
    }
}

module.exports = UserController