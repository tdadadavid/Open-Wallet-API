const request = require('supertest');
const app = require("../app");
const { generateAccessToken } = require("../utils/tokenFunc");
const User = require("../components/Users/models/User");


describe('Testing verifyToken module', () => {


    let token;

    const executeRequest =  () => {
        return  request(app)
            .post('/api/auth/users/login')
            .set('x-auth-token', token)
            .send({ email: "email@gmail.com", password: "mypass11122"});
    }

    it('should return 401 if the request header has no token', async () => {
        token = "";

        const response = await executeRequest();
        expect(response.body.message).toBe("Access denied");
        expect(response.status).toEqual(401);
    });

    it('should return Invalid token when a tampered token is given', async () => {
        token =  generateAccessToken(new User().id);
        token += "tampered";


        const response = await executeRequest();
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual("Invalid token provided");
    });


})
