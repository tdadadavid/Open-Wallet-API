const config = require('./config');
const { connectToDatabase } = require('./database');
const app = require('./app');

connectToDatabase();

app.listen(config.port, () => { console.log(`Server running on port ${ config.port }`)});