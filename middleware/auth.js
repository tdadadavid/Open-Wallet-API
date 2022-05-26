const User = require('../components/Users/models/User')
const {errorMessage} = require("../utils/helpers");

async function ensureUniqueEmail(req, res, next) {
    const email =  req.inputs.email;

    try{
        const user = await User.findByEmail(email);
        if (user){
            console.log(user);
            errorMessage(res, 422, "Email is already taken");
            return
        }

        next();
    }catch (err){
        console.log(err);
        errorMessage(res, 500, "Oops! an error occurred.");
    }
}


module.exports = ensureUniqueEmail;