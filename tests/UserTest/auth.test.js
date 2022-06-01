const request = require('supertest');
const app = require("../../app");
const { generateAccessToken } = require("../../utils/tokenFunc");
const User = require("../../components/Users/models/User");


describe('Testing verifyToken module', () => {


    const id = new User().id
    let token = generateAccessToken(id);

    const executeRequest =  () => {
        return  request(app)
            .post('/api/auth/users/login')
            .set('x-auth-token', token)
            .send({ email: "newemail@gmail.com", password: "myPassword1" });
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

    // copied the id from the test database to verify
    it('should get the user id from the token', async () =>  {
        const response = await executeRequest();
        expect(response.status).toBe(200);
        expect(response.body.data.id).toEqual("R2POLxqGo6bv")
    });


})
