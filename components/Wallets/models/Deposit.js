const nanoid = require('nanoid');
const { db } = require('../../../database')

class Deposit {
    constructor(amount, wallet_id) {
        this.id = nanoid.nanoid(18);
        this.amount = amount;
        this.wallet = wallet_id;
        this.created_at = undefined;
    }

    toJSON(){
        return {
            id: this.id,
            amount: this.amount,
            created_at: this.created_at
        }
    }

    static transform(array){
        return array.map(result => {
            const deposit = new Deposit(result.amount, result.source_wallet);
            deposit.created_at = result.created_at;
            return deposit;
        })
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

    static getDepositsByWalletID(id){
        const statement = "SELECT * FROM test_openwallet.test_deposits WHERE source_wallet = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, id, (err, result) => {
                if (err){
                    reject(err);
                }else if (result.length === 0){
                    resolve(null);
                }else {
                    console.log(result);
                    const deposits = this.transform(result);
                    console.log(deposits);
                    resolve(deposits);
                }
            });
        });
    }
}

module.exports = Deposit;