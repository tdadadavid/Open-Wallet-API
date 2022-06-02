const request = require('supertest');
const app = require('../../app');
const {generateAccessToken} = require("../../utils/tokenFunc");


describe('Deposit Tests', () =>  {


    let token;
    let inputs;
    let postUrl;
    let getUrl;

    beforeEach(() => {

        // this id is from the database.
        token = generateAccessToken('R2POLxqGo6bv');
        inputs = { amount: 10000 };

    });

    const makePostRequest = (wallet_id) => {
        postUrl = `/api/wallets/${wallet_id}/deposits`;
        return request(app)
            .post(postUrl)
            .set('x-auth-token', token)
            .send(inputs);
    }

    const makeGetRequest = (wallet_id) => {
        getUrl = `/api/wallets/${wallet_id}/deposits`;
        return request(app)
            .get(getUrl)
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
        inputs.amount = 18000.000;

        const response = await makePostRequest('KzoLgfpqmaKvnXAC');
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Transaction [deposit] successful');
    });

    it('should return 404 if the wallet has no deposit', async () => {
        const wallet_that_has_no_deposit = '4VL7d2WMWS-z9kA1'
        const response = await makeGetRequest(wallet_that_has_no_deposit);
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual("No deposit has been made to this wallet");
    });

    it('should return 200 if the wallet has deposit', async () => {
        const wallet_that_has_deposits = 'cYpYDcZv32lrzq1K';
        const response = await makeGetRequest(wallet_that_has_deposits);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Here you go, Transactions [deposits].");
    });

    it('should return the details of a particular deposit', async () => {
        const wallet_that_has_deposits = 'cYpYDcZv32lrzq1K';
        const deposit_made_to_this_wallet = '71zrw7IwWm3DU0lD69';

        getUrl = `/api/wallets/${wallet_that_has_deposits}/deposits/${deposit_made_to_this_wallet}`;

        const response = await request(app)
                                .get(getUrl)
                                .set('x-auth-token', token);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Deposit found.");
    });

    it('should return 404 error if a deposit does not exists', async () => {
        const wallet_that_has_deposits = 'cYpYDcZv32lrzq1K';
        const deposit_that_does_not_exists = 'doesnotexist';

        getUrl = `/api/wallets/${wallet_that_has_deposits}/deposits/${deposit_that_does_not_exists}`;

        const response = await request(app)
            .get(getUrl)
            .set('x-auth-token', token);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Deposit not found.");

    });

});