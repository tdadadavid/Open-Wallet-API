const { sign } = require('jsonwebtoken');
const config = require('../config')


function generateAccessToken(userID) {
    return sign({ id: userID }, config.jwtSecrets.ACCESS_TOKEN_SECRET, {
        expiresIn: '10d'
    });
}

function generateRefreshToken(userID) {
    return sign({ id: userID }, config.jwtSecrets.REFRESH_TOKEN_SECRET);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}