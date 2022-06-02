const { db } = require('../../../database')
const nanoid = require('nanoid');


class Transfer {
    constructor(amount, source_wallet, destination_wallet, converted_amount) {
        this.id = nanoid.nanoid(18);
        this.amount = amount;
        this.source_wallet = source_wallet;
        this.destination_wallet = destination_wallet;
        this.converted_amount = converted_amount;
        this.created_at = undefined;
    }

    static transfer(details){
        const statement = `INSERT INTO test_openwallet.test_transfers 
                (id, amount, source_wallet, source_wallet_currency, destination_wallet, destination_wallet_currency, converted_amount) 
                                VALUES (?,?,?,?,?,?,?)`;
        const values = [
            details.id, details.amount, details.source_wallet.id,
            details.source_wallet.currency, details.destination_wallet.id,
            details.destination_wallet.currency, details.converted_amount
        ];

        console.log("This is the values", values);

        return new Promise((resolve, reject) => {
            db.query(statement, values, (err, results) => {
                if (err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    }

}

module.exports = Transfer;