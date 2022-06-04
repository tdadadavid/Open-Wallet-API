const config = require('../config');
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
});


const connectToDatabase = async () => {
    try{
        await db.connect();
        console.log("Database connection established")
    }catch (err) {
        console.error({
            err,
            message: "Unable to establish database connection"
        });
        process.exit(1);
    }
}

function truncateTable(tableName){
    const statement = `TRUNCATE TABLE test_openwallet.${tableName}`;
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
                // console.log("connection closed");
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