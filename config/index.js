const dotenv = require('dotenv');

dotenv.config();

const config = {

    database: {
        production: {
            host: process.env.DB_PROD_HOST,
            user: process.env.DB_PROD_USER,
            name: process.env.DB_PROD_NAME,
            password: process.env.DB_PROD_PASSWORD
        },

        development: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            name: process.env.DB_NAME,
            password: process.env.DB_PASSWORD
        },

        test: {
            host: process.env.DB_TEST_HOST,
            user: process.env.DB_TEST_USER,
            name: process.env.DB_TEST_NAME,
            password: process.env.DB_TEST_PASSWORD
        }
    },

    port: process.env.PORT || 8080,

    jwtSecrets: {
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
    },

    exchangeRatesAPIKey: process.env.EXCHANGE_RATES_API_KEY,
}


module.exports = config