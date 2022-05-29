const { verify } = require('jsonwebtoken');
const {errorMessage} = require("../utils/apiResponses");
const config = require('../config');

const verifyToken = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        errorMessage(res, 401, "Access denied");
        return;
    }

    try{
        req.user = await verify(token, config.jwtSecrets.ACCESS_TOKEN_SECRET);
        next()
    }catch(err){
        errorMessage(res, 400, "Invalid token provided");
    }
}


module.exports = verifyToken;