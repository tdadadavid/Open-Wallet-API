const fetch = require('node-fetch');
const config = require('../config/index');


const converter = {

    requestOptions: {
        method: 'GET',
        redirect: 'follow',
        headers: {
            apiKey: config.exchangeRatesAPIKey,
        }
    },

    getConversion: async (from, to, amount) => {

        const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`;
        const response = await fetch(url, converter.requestOptions)
        return response.status === 200 ? response.json() : "error";
    },

}

module.exports = converter;