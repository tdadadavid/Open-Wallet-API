const bcrypt = require('bcrypt');

async function hashUserPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

function successResponse(res, status, message, data) {
    res.status(status).json({
        status,
        message,
        data
    });
}

function errorResponse(res, status, message, data) {
    res.status(status).json({
        status,
        message,
        data
    });
}


function successMessage(res, status, message) {
    res.status(status).json({
        status,
        message
    });
}

function errorMessage(res, status, message) {
    res.status(status).json({
        status,
        message
    });
}


module.exports = {
    hashUserPassword,
    successResponse,
    successMessage,
    errorMessage,
    errorResponse
}