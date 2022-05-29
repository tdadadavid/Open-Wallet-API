const request = require('supertest');
const app = require('../../app');
const {generateAccessToken} = require("../../utils/tokenFunc");

describe('Wallets Test.', () => {

    let token;
    let inputs;

    beforeEach(() => {

        // this id is from the database.
        token = generateAccessToken('R2POLxqGo6bv');
        inputs = { currency: 'NGN' };

    });

    const makePostRequest = () => {
        return request(app)
            .post('/api/wallets')
            .set('x-auth-token', token)
            .send(inputs);
    }

    const makeGetRequest = () => {
        return request(app)
            .get('/api/wallets')
            .set('x-auth-token', token);
    }

    it('should return 200 on saving the wallet to the db', async () => {
        const response = await makePostRequest();
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Wallet created successfully");
    });


    it('should return all wallets ', async () => {
        const response = await makeGetRequest();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Here you go.");
        expect(response.body.data.currency).toBe("NGN")
    });


})