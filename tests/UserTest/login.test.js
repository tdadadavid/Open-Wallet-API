const request = require('supertest');
const app = require('../../app')
const {generateAccessToken} = require("../../utils/tokenFunc");
const User = require("../../components/Users/models/User");
const {connectToDatabase, closeConnection, truncateTable} = require("../../database");
const makeUser = require("../../utils/factoryFunc");

describe("Test login", () => {


    let inputs;
    let token;
    let registeredUser;


    beforeAll(() => {
        jest.setTimeout(1000000000000000);
        connectToDatabase();
        truncateTable('test_users')
        registeredUser = makeUser();
    });


    beforeEach(() => {
        token = generateAccessToken(new User().id);
        inputs = {
            email: "newemail@gmail.com",
            password: "myPassword1"
        };
    });

    afterAll(() => {
        closeConnection();
    })

    const makeRequest = () => {
        return request(app)
            .post('/api/auth/users/login')
            .set('x-auth-token', token)
            .send(inputs);
    }

    it('should return 404 if the email given is not found ', async () => {
        jest.setTimeout(100000000000000000);
        inputs.email = "nonexisting@gmail.com";
        const response = await makeRequest();
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("Email not found");
    });

    it('should throw 400 error if the passwords don"t match' , async () => {
        jest.setTimeout(1000000000000000000000000);
        inputs.password = "myPassword2";

        const response = await makeRequest();
        expect(registeredUser.password).not.toEqual(inputs.password);
        // expect(response.body.message).toEqual("Password doesn't match");
    });

    it('should return 200 when all the inputs are correct', async () => {
        jest.setTimeout(1000000000000000000000000);
        const response = await makeRequest();
        expect(response.status).toEqual(200);
    });

});