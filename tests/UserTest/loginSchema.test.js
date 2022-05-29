const request = require('supertest');
const app = require("../app");
const { generateAccessToken } = require("../utils/tokenFunc");
const User = require("../components/Users/models/User");


describe("Testing the loginSchema module", () => {

    let inputs;
    let token;

    beforeEach(() => {
        inputs = {
            email: "emailGiven@gmail.com",
            password: "myPassword1",
        }
        token = generateAccessToken(new User().id);
    })


    const executeRequest =  () => {
        return request(app)
            .post('/api/auth/users/login')
            .set('x-auth-token', token)
            .send(inputs);
    }


    it('should throw validation if email is not given', async () => {

        inputs = {
            password: "myPassword1"
        }

        const response = await executeRequest();
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('"email" is required');
    });

    it('should throw error if a wrong format of email is given', async () => {
        inputs = {
            password: "myPassword1",
            email: "dotgovisnotvalid@gmail.gov"
        }

        const response = await executeRequest();
        expect(response.status).toBe(400);
    });

    it("should return 400 error when password doesn't meet regex", async () => {
        inputs = {
            password: "doesm",
            email: "goodEmail@gmail.com"
        }

        const response = await executeRequest();
        expect(response.status).toBe(400);
    });

})
