const {errorMessage} = require("../utils/apiResponses");
const Wallet =  require('../components/Wallets/models/Wallet')


const verifyWallet = async (req, res, next) => {

    const id = req.params.id;

    try{
        const wallet = await Wallet.findByID(id);
        if(!wallet) return errorMessage(res, 400, `Wallet with this id ${id} not found`);

        req.wallet = wallet;
        next();
    }catch (e) {
        console.log(e);
        errorMessage(res, 500, "Oops! an error occurred");
    }


}


module.exports = verifyWallet;