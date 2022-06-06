const router = require('./components');
const helmet = require('helmet');
const cors  = require('cors');

const express =  require('express');
const {errorMessage} = require("./utils/apiResponses");
const app = express();


// to accept json payload
app.use(express.json());
app.use(helmet());
app.use(cors());


// entry point for all routes
app.use(router)

// error handler
app.use((req, res, next) => {
    next(new Error(`Unable to process the endpoint ${req.url}`));
});

app.use((err, req, res, next) => {
    errorMessage(res, 500, err.toString());
})


module.exports = app;
