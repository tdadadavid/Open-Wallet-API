const depositSchema = require("../validationSchema");
const {errorMessage} = require("../../../utils/apiResponses");


const validateDeposits = async (req, res, next) => {
    const { amount } = req.body;

    try{
        const {error: err, value} = await depositSchema.validate({amount});

        if (err) {
            console.log(err);
            return errorMessage(res, 400, `Error! cannot make deposit, ${err.message}`);
        }

        req.depositAmount = value;
        next();
    }catch (e) {
      console.log(e)
      errorMessage(res, 500, "oops! an error occurred");
    }
}

module.exports = validateDeposits;