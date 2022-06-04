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

    toJSONSpecific(){
        return {
            id: this.id,
            amount_transferred: this.amount,
            source_wallet: this.source_wallet,
            recipient_wallet: this.destination_wallet,
            exchangeRates: {
                source_wallet_currency: this.source_wallet_currency,
                recipient_wallet_currency: this.destination_wallet_currency,
                rate: (this.converted_amount / this.amount)
            },
            created_at: this.created_at,
        }
    }

    toJSON(){
        return {
            id: this.id,
            amount_transferred: this.amount,
            source_wallet: this.source_wallet,
            recipient_wallet: this.destination_wallet,
            created_at: this.created_at,
        }
    }

    static transform(array){
        return array.map(values => {
            const transfer = new Transfer(values.amount, values.source_wallet, values.destination_wallet, values.converted_amount);
            transfer.id = values.id;
            transfer.source_wallet_currency = values.source_wallet_currency;
            transfer.destination_wallet_currency = values.destination_wallet_currency;
            transfer.created_at = values.created_at;
            return transfer;
        });
    }

    static transfer(details){
        const statement = `INSERT INTO  transfers 
                (id, amount, source_wallet, source_wallet_currency, destination_wallet, destination_wallet_currency, converted_amount) 
                                VALUES (?,?,?,?,?,?,?)`;
        const values = [
            details.id, details.amount, details.source_wallet.id,
            details.source_wallet.currency, details.destination_wallet.id,
            details.destination_wallet.currency, details.converted_amount
        ];

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

    static findBySourceWalletID(id){
        const statement = "SELECT * FROM  transfers WHERE source_wallet = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, id, (err, results) => {
                if (err){
                    reject(err);
                }else if (results.length === 0){
                    resolve(null);
                }else{
                    const transfers = this.transform(results);
                    resolve(transfers);
                }
            });
        });
    }

    static findByTransferID(transfer_id, wallet_id){
        const statement = "SELECT * FROM  transfers WHERE id = ? AND source_wallet = ?";

        const values = [transfer_id, wallet_id];
        return new Promise((resolve, reject) => {
            db.query(statement, values, (err, results) => {
                if (err){
                    reject(err)
                }else if (results.length === 0){
                    resolve(null);
                }else{
                    const transfer = this.transform(results);
                    resolve(transfer);
                }
            })
        })
    }

}

module.exports = Transfer;