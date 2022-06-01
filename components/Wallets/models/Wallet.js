const { db } = require('../../../database');
const nanoid = require('nanoid');

class Wallet {

    constructor(currency, user) {
        this.id = nanoid.nanoid(16);
        this.currency = currency;
        this.amount = 0.0000;
        this.user_id = user;
    }

    toJSON(){
        return {
            id: this.id,
            currency: this.currency,
            amount: this.amount
        }
    }

    static transform(array){
        return array.map(result => {
            const newWallet = new Wallet(result.currency, result.user_id);
            newWallet.amount = result.amount;
            newWallet.id = result.id;
            return newWallet;
        });
    }

    static save(wallet){
        const statement = `INSERT INTO test_openwallet.test_wallets (id, currency, amount, user_id)
                            VALUES (?, ?, ?, ?)`;
        const values = [wallet.id, wallet.currency, wallet.amount, wallet.user_id];

        return new Promise((resolve,reject) => {
            db.query(statement, values, (err) => {
                if (err) {
                    reject(err);
                } else {
                    const result = this.findByID(wallet.id);
                    resolve(result);
                }
            });
        });
    }

    static findByOwner(owner){
        const statement = "SELECT * FROM test_openwallet.test_wallets WHERE user_id = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, owner, (err, results) => {
                if (err){
                    reject(err);
                }else if (results.length === 0){
                    resolve(null);
                }else{
                    const wallet = this.transform(results);
                    resolve(wallet);
                }
            });
        });
    }

    static findByID(id){
        const statement = `SELECT * FROM test_openwallet.test_wallets WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.query(statement, id, (err, results) => {
                if (err){
                    reject(err);
                }else if (results.length === 0){
                    resolve(null);
                }else{
                    const wallet = this.transform(results);
                    resolve(wallet);
                }
            })
        })
    }

    static deleteByID(id){
        const statement = "DELETE FROM test_openwallet.test_wallets WHERE id = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, id, (err, result) => {
                if (err){
                    reject(err);
                }else{
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

}

module.exports = Wallet;