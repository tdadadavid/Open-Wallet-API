const { db } = require('../../../database');
const nanoid = require('nanoid');

class User {

    constructor(firstname, lastname, email, password) {
        this.id = nanoid.nanoid(12);
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.token = undefined;
    }

    toJSON(){
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            token: this.token
        }
    }

    static transform(array){
        return array.map(element => {
            const newUser = new User(element.firstname, element.lastname, element.email, element.password);
            newUser.token = element.token;
            newUser.id = element.id;
            return newUser;
        });
    }

    static save(user){

        const statement = `INSERT INTO  users (id, firstname, lastname, email, token, password) 
                            VALUES (?, ?, ?, ?, ?, ?)`;

        const values = [user.id, user.firstname, user.lastname, user.email, user.token, user.password];

        return new Promise((resolve, reject) => {
            db.query(statement, values, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    const result = await User.findByEmail(user.email);
                    const newUser = this.transform(result);
                    resolve(newUser);
                }
            });
        });
    }

    static findByEmail(userEmail){
        const statement = `SELECT * FROM  users WHERE email = ?`;

        return new Promise((resolve, reject) => {
            db.query(statement, userEmail , (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0){
                    console.log(results);
                    resolve(null);
                }else {
                    const user = this.transform(results);
                    resolve(user);
                }
            });
        });
    }

}


module.exports = User;