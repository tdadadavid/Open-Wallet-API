const nanoid = require('nanoid');
const { db } = require('../../../database')

class Withdrawal {
    constructor(amount, wallet) {
        this.id = nanoid.nanoid(18);
        this.amount = amount;
        this.wallet_id = wallet;
        this.created_at = undefined;
    }

    toJSON(){
        return {
            id: this.id,
            amount_withdrawn: this.amount,
            created_at: this.created_at
        }
    }

    static transform(array){
        return array.map(result => {
            const withdrawal = new Withdrawal(result.amount, result.source_wallet);
            withdrawal.created_at = result.created_at;
            return withdrawal;
        });
    }

    static withdraw(details){
        const statement = `INSERT INTO test_openwallet.test_withdrawals (id, amount, source_wallet)
                            VALUES (?, ? , ?)`;

        const values = [details.id, details.amount, details.wallet_id];

        return new Promise((resolve, reject) =>{
            db.query(statement, values, (err) => {
                if (err){
                    reject(err);
                }else {
                    resolve(true);
                }
            })
        })
    }

    static getWithdrawalsByWalletID(id){
        const statement = "SELECT * FROM test_openwallet.test_withdrawals WHERE source_wallet = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, id, (err, results) => {
                if (err){
                    reject(err);
                }else if (results.length === 0){
                    resolve(null)
                }else{
                    const withdrawals = this.transform(results);
                    resolve(withdrawals);
                }
            });
        });
    }

    static getWithdrawalByID(id){
        const statement = "SELECT * FROM test_openwallet.test_withdrawals WHERE id = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, id, (err, results) => {
                if (err){
                    reject(err);
                }else if (results.length === 0){
                    resolve(null);
                }else{
                    const withdrawal = this.transform(results);
                    resolve(withdrawal);
                }
            });
        });
    }
}

module.exports = Withdrawal;