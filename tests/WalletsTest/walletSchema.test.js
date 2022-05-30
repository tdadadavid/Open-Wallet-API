const request = require('supertest');
const app = require('../../app');
const {generateAccessToken} = require("../../utils/tokenFunc");

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

    // this has an indirect relationship with auth
    it('should throw error if no token is provided', async () => {
        token = '';

        const response = await makeRequest();
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Access denied");
    });


});