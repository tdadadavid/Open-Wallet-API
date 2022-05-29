const { db } = require('../../../database');
const nanoid = require('nanoid');

class Wallets {

    constructor(currency, amount) {
        this.id = nanoid.nanoid(16);
        this.currency = currency;
        this.amount = amount;
        this.user_id = undefined;
    }

}


module.exports = Wallets;