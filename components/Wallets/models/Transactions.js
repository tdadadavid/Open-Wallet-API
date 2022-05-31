const nanoid = require('nanoid');

class Transactions {
    constructor(amount, type, wallet_id) {
        this.id = nanoid.nanoid(18);
        this.type = type;
        this.amount = amount;
        this.wallet = wallet_id;
        this.created_at = undefined;
    }
}