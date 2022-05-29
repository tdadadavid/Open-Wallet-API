const nanoid = require('nanoid');
const {generateAccessToken} = require("./tokenFunc");
const {db} = require("../database");
const {hashUserPassword} = require("./apiResponses");

const id = nanoid.nanoid(12);
const token = generateAccessToken(id);


const makeUser = async () => {

    const password = await hashUserPassword("myPassword1");
    const statement = `INSERT INTO test_openwallet.test_users (id, firstname, lastname, email, token, password)
                            VALUES (?, ?, ?, ?, ? ,?)`;
    const values = [id, "firstname", "lastname", "newemail@gmail.com", token, password];

    return new Promise((resolve,reject) => {
        db.query(statement, values, (err) => {
            if (err){
                reject(err);
            }else{
                resolve(true);
            }
        });
    });
}


module.exports = makeUser;
