const config = require('../config');
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: config.database.test.host,
    user: config.database.test.user,
    password: config.database.test.password,
    database: config.database.test.name,
});


const connectToDatabase = async () => {
    try {
        await db.connect((err) => {
            if (err){
                console.log("Unable to establish database connection");
                console.log(err);
            }else{
                console.log("Database connection established");
            }
        });
    }catch (e) {
        console.log(e);
        console.log("Oops! an error occurred.")
    }
}

function truncateTable(tableName){
    const statement = `TRUNCATE TABLE ${tableName}`;
    return new Promise((resolve, reject) => {
        db.query(statement, (err, results) => {
            if (err){
                console.log(err);
            }else{
                console.log(results);
                console.log("Table truncated successfully")
            }
        })
    })
}



function closeConnection(){
    return new Promise((resolve, reject) => {
        db.end(err => {
            if (err){
                console.log(err);
                console.log("Oops! an error occurred");
                reject(err)
            }else{
                console.log("connection closed");
            }
        });
    })

}




module.exports = {
    connectToDatabase,
    truncateTable,
    closeConnection,
    db
}