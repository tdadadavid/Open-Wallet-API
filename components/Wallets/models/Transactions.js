const nanoid = require('nanoid');
const { db } = require('../../../database')

class Transactions {
    constructor(amount, wallet_id, type) {
        this.id = nanoid.nanoid(18);
        this.type = type;
        this.amount = amount;
        this.wallet = wallet_id;
        this.created_at = undefined;
    }

    static deposit(details){
        const statement =  `INSERT INTO test_openwallet.test_deposits (id, amount, source_wallet) 
                            VALUES (?, ?, ?)`;
        const values = [details.id, details.amount, details.wallet];

        return new Promise((resolve, reject) => {
            db.query(statement, values, (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });
    }
}

module.exports = Transactions;