const request = require('supertest');
const app = require('../../app');
const {generateAccessToken} = require("../../utils/tokenFunc");
const User = require("../../components/Users/models/User");


describe('Wallet schema test', () => {

    let token;
    let inputs;

    beforeEach(() => {
        // this id is from the database.
        token = generateAccessToken('R2POLxqGo6bv');
        inputs = { currency: 'NGN' };

    });

    const makeRequest = () => {
        return request(app)
            .post('/api/wallets')
            .set('x-auth-token', token)
            .send(inputs);
    }

    it('should throw invalid currency input', async () =>  {
        inputs.currency = '';

        const response = await makeRequest();
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid currency input");
    });

    it('should throw error if no token is provided', async () => {
        token = '';

        const response = await makeRequest();
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Access denied");
    });

    it('should return 200 on saving the wallet to the db', async () => {
        const response = await makeRequest();
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Wallet created successfully");
    });



});