const request = require('supertest');
const app = require('../../app');
const {generateAccessToken} = require("../../utils/tokenFunc");

describe('Wallets Test.', () => {

    let token;
    let inputs;

    beforeEach(() => {

        // this id is from the database.
        token = generateAccessToken('R2POLxqGo6bv');
        inputs = { currency: 'CAD' };

    });

    const makePostRequest = () => {
        return request(app)
            .post('/api/wallets')
            .set('x-auth-token', token)
            .send(inputs);
    }

    const makeGetRequest = (url) => {
        return request(app)
            .get(url)
            .set('x-auth-token', token);
    }

    const makeDeleteRequest = (url) => {
        return request(app)
            .delete(url)
            .set('x-auth-token', token);
    }

    it('should return 200 on saving the wallet to the db', async () => {
        const response = await makePostRequest();
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Wallet created successfully");
    });


    it('should return all wallets', async () => {
        const response = await makeGetRequest('/api/wallets');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Here you go.");
        expect(response.body.data.currency).toBe("NGN")
    });

    it('should return 404 error if user does not have wallet', async () => {
        const USER_THAT_HAS_NO_WALLET = 'CqBurtszNPsT';
        token = generateAccessToken(USER_THAT_HAS_NO_WALLET);

        const response = await makeGetRequest('/api/wallets');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Omooo! you don't have any wallet");
    });

    it('should return a wallet for a user', async () => {
        const EXISTING_WALLET_ID = 'R6UsuuY_Rci_fLw-';
        const response = await makeGetRequest(`/api/wallets/${EXISTING_WALLET_ID}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Here you go.");
    });

    it('should return error if the wallet doesn"t exists', async () => {
        const WALLET_THAT_DOES_NOT_EXISTS = 'ohjfbj3h80';
        const response = await makeGetRequest(`/api/wallets/${WALLET_THAT_DOES_NOT_EXISTS}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(`Omooo! wallet with id ${WALLET_THAT_DOES_NOT_EXISTS} was not found`);
    });

    // First make a wallet before runing this test
    it('should delete the user"s wallet', async () => {
        const WALLET_ID = "93vd4viGbgtaYW62";
        const response = await makeDeleteRequest(`/api/wallets/${WALLET_ID}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Wallet deleted successfully");
    });

    it('should throw an error if the wallet does not exist', async () => {
        const WALLET_THAT_DOES_NOT_EXISTS = 'ohjfbj3h80';
        const response = await makeDeleteRequest(`/api/wallets/${WALLET_THAT_DOES_NOT_EXISTS}`);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Unable to delete wallet");
    });


});