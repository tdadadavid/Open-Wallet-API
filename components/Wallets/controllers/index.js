const Wallet = require('../models/Wallets');
const {errorMessage, successResponse} = require("../../../utils/apiResponses");

const WalletController = {

    createWallet: async (req, res) => {

        const { currency } = req.currency;
        const user_id = req.user.id;

        const wallet = new Wallet(currency, user_id);

        const userWallet = await Wallet.save(wallet);
        if (!userWallet) return errorMessage(res, 500, "Oops! an error occurred");

        return successResponse(res, 201, "Wallet created successfully", userWallet[0].toJSON());
    }
}


module.exports = WalletController;