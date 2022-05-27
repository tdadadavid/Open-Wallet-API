const { request } = require('supertest');
const app = require('../app')
const setup = require('./setup')

describe('Login user routes', () => {

    setup();

    const url = '/api/auth/users/login';
    const validUserInput = {
        email: "davidtofunmidada@gmail.com",
        password: "mysqlPassword1"
    };

    //TODO validate the user inputs
        // check if there is a valid x-auth-token in the header


    //TODO authenticate the user
    //    password is required
    //    email must be valid.

    it('should return a status code of 200', async ()  => {
        request(app)
            .post(url)
            .header('x-auth-token', )
            .send()
    });


});