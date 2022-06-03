 const nanoid = require('nanoid');
 const {db} = require("../../../database");


class Transaction {
    constructor(transaction) {
        this.transaction = transaction;
    }

    toJSON(){
        return {
            source_wallet: this.transaction.userWallet,
            wallet_currency: this.transaction.currency,
            deposits: {
                id: this.transaction.userWallet,
                amount: this.transaction.depositAmount,
                date_deposited: this.transaction.depositDate
            },
            transfers: {
                id: this.transaction.transfers,
                amount: this.transaction.transfersAmount,
                transfer_rate: this.transaction.transferRate,
                date_transferred: this.transaction.transferDate
            },
            withdrawals: {
                id: this.transaction.withdrawal,
                amount_withdrawn: this.transaction.withdrawalAmount,
                date_withdrawn: this.transaction.withdrawalsDate
            }
        }
    }

    static transform(array){
        return array.map(values => {
            return new Transaction(values);
        });
    }

    static getWalletTransactionByID(wallet_id, user_id){
        const statement = `CALL get_wallet_transactions("${wallet_id}", "${user_id}")`;

        return new Promise((resolve, reject) => {
            db.query(statement, (err, results) => {
                if (err){
                    reject(err);
                }else if (results.length === 0){
                    resolve(null);
                }else{
                    const transactions = this.transform(...results);
                    resolve(transactions);
                }
            });
        });
    }
}

 module.exports = Transaction;