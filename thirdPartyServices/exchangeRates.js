const fetch = require('node-fetch');
const config = require('config');

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        'content-type': 'application/json',
        'apiKey': config.exchangeRatesAPIKey,
    }
};

const specifications = async (from, to, amount) => {

    const url = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`
    const response = await fetch(url, requestOptions);

    if (response.status === 200) return response.json();

    return "error";
}


const getConversion = async (from, to, amount) => {
    const result = await specifications(from, to, amount);
    console.log(result);
}


module.exports = getConversion;


