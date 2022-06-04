const router = require('./components');

const express =  require('express');
const app = express();


// to accept json payload
app.use(express.json());


// entry point for all routes
app.use(router)

// error handler
app.use((req, res, next) => {
    next(new Error(`Unable to process the endpoint ${req.url}`));
});

app.use((err, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: err.toString()
    });
})


module.exports = app;
