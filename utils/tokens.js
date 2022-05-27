const { sign } = require('jsonwebtoken');
const config = require('../config')


function generateAccessToken(userID) {
    if (!userID) return new Error("User id not defined");
    sign({ id: userID }, config.jwtSecrets.ACCESS_TOKEN_SECRET, {
        expiresIn: '2016h'
    });
}

function generateRefreshToken(userID) {
    if (!userID) return new Error("User id not defined");
    return sign({ id: userID }, config.jwtSecrets.REFRESH_TOKEN_SECRET);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}