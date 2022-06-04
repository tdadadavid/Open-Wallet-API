const dotenv = require('dotenv');

dotenv.config();

const config = {

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        name: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    },

    port: process.env.PORT || 8080,

    jwtSecrets: {
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
    },

    exchangeRatesAPIKey: process.env.EXCHANGE_RATES_API_KEY,
}


module.exports = config