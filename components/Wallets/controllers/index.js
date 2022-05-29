const Wallet = require('../models/Wallets');
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const WalletController = {

    createWallet: async (req, res) => {

        const { currency } = req.currency;
        const user_id = req.user.id;

        const wallet = new Wallet(currency, user_id);

        try{
            const userWallet = await Wallet.save(wallet);
            successResponse(res, 201, "Wallet created successfully", userWallet[0].toJSON());
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred");
        }

    },

    getUserWallets: async (req, res) => {
        const owner = req.user.id;

        try{
            const user = await Wallet.findByOwner(owner);
            console.log(user);
            successResponse(res, 200, "Here you go.", user[0].toJSON());
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred");
        }
    }
}


module.exports = WalletController;