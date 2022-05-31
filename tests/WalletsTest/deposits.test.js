const request = require('supertest');
const app = require('../../app');
const {generateAccessToken} = require("../../utils/tokenFunc");


describe('Deposit Tests', () =>  {


    let token;
    let inputs;

    beforeEach(() => {

        // this id is from the database.
        token = generateAccessToken('R2POLxqGo6bv');
        inputs = { amount: 10000 };

    });

    const makePostRequest = (wallet_id) => {
        return request(app)
            .post(`/api/wallets/${wallet_id}/deposits`)
            .set('x-auth-token', token)
            .send(inputs);
    }

    const makeGetRequest = (url) => {
        return request(app)
            .get(url)
            .set('x-auth-token', token);
    }


    it('should return 400 error if no deposit amount is given', async () => {
        inputs.amount = undefined;

        const response = await makePostRequest('mPo0qpV3sM82s56k');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Error! cannot make deposit, \"amount\" is required");
    });

    it('should return error if deposit is less than 100', async () => {
        inputs.amount = 10;

        const response = await makePostRequest('mPo0qpV3sM82s56k');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Error! cannot make deposit, \"amount\" must be greater than or equal to 100');
    });

    it('should return 200 when deposit is made', async () => {
        inputs.amount = 10000.0000;

        const response = await makePostRequest('mPo0qpV3sM82s56k');
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Transaction [deposit] successful');
    });


});