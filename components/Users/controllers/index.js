const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../../../utils/tokenFunc');
const { hashUserPassword,errorMessage, successResponse} = require('../../../utils/apiResponses');
const {compare} = require("bcrypt");

const UserController = {

    async signUp(req, res){

        const inputs = req.inputs;

        //hash user password
        const password = await hashUserPassword(inputs.password);

        //instantiate user
        const newUser = new User(inputs.firstname, inputs.lastname, inputs.email, password);

        //generate user token
        const access_token = await generateAccessToken(newUser.id);

        //assign refresh token to user
        newUser.token = await generateRefreshToken(newUser.id);

        //assign the access token to the header
        res.header('x-auth-token', access_token);

        try{
            const user = await User.save(newUser);
            successResponse(res, 201, "New user registered", user[0].toJSON());
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred");
        }
    },

    async login(req, res) {

        const payload = req.userInputs;

        // check if this is a registered user
        const user = await User.findByEmail(payload.email);
        if(!user) return errorMessage(res, 404, "Email not found");

        try{
            // check if the passwords are correct
            const successful = await compare(payload.password, user[0].password);
            if (!successful) return errorMessage(res, 400, "Password doesn't match");

            //generate user token
            const access_token = await generateAccessToken(user[0].id);

            //assign the access token to the header
            res.header('x-auth-token', access_token);

            // log the user in
            successResponse(res, 200, "User logged in", user[0].toJSON());
        }catch (err) {
            console.log(err)
            errorMessage(res, 500, "Oops! an error occurred.");
        }
    },


}

module.exports = UserController