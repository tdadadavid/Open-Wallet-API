
const WalletDepositController = {

    makeDeposit: async (req, res) => {
        const { depositAmount } = req.depositAmount;
        console.log(depositAmount);
    }

}


module.exports = WalletDepositController;