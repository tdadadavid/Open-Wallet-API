const supertest = require('supertest');
const config = require('../config');
const db = require('../database')

beforeAll(async () => {
    try{

        await db.connect((err) => {
            if (err){
                console.log(err)
            }else{
                console.log("Connected to test database successfully");
            }
        });

    }catch (err) {
        console.log(err);
    }
});

beforeEach(async () => {
    try{

        // refresh test database

    }catch (err){

    }
});


afterAll(async () => {
    try {
        // close the db connection
    }catch (err){

    }
})