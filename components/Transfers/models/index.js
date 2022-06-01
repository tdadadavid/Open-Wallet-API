const { db } = require('../../../database')
const nanoid = require('nanoid');


class Transfer {
    constructor(amount, source_wallet, destination_wallet) {
        this.id = nanoid.nanoid(18);
        this.amount = amount;
        this.source_wallet = source_wallet;
        this.destination_wallet = destination_wallet;
        this.created_at = undefined;
    }

    static transfer(details){
        const statement = `INSERT INTO test_openwallet.test_transfers (id, amount, source_wallet, destination_wallet) 
                                VALUES (?,?,?,?)`;
        const values = [details.id, details.amount, details.source_wallet, details.destination_wallet];

        return new Promise((resolve, reject) => {
            db.query(statement, values, (err, results) => {
                if (err){
                    reject(err);
                }else{
                    resolve(results); //TODO work on transfer triggers.
                }
            });
        });
    }

}

module.exports = Transfer;