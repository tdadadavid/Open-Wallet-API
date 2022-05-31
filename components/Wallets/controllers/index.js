const Wallet = require('../models/Wallet');
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
            const wallets = await Wallet.findByOwner(owner);
            if (!wallets) return errorMessage(res, 404, "Omooo! you don't have any wallet");
            return successResponse(res, 200, "Here you go.", wallets[0].toJSON());
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred");
        }
    },

    getWallet: async (req, res) => {
        const { id }= req.params;

        try{
            const wallet = await Wallet.findByID(id);
            if (wallet === null) return errorMessage(res, 404, `Omooo! wallet with id ${id} was not found`);
            successResponse(res, 200, "Here you go.", wallet[0].toJSON());
        }catch (e) {
            console.log(e);
            errorMessage(res, 400, "Oops! an error occurred");
        }
    },

    closeWallet: async (req, res) => {
        const { id } = req.params;

        try{
            const isSuccessful = await Wallet.deleteByID(id);
            if (!isSuccessful) return errorMessage(res, 400, "Unable to delete wallet");
            return successResponse(res, 200, "Wallet deleted successfully");
        }catch (e) {
            console.log(e);
            errorMessage(res, 500, "Oops! an error occurred");
        }
    },

}


module.exports = WalletController;