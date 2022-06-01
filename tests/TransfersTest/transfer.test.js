const request = require('supertest');
const app = require('../../app');
const User = require("../../components/Users/models/User");
const {generateAccessToken} = require("../../utils/tokenFunc");



describe('Transfer module', () => {


    let user = new User();
    let postUrl;
    let getUrl;
    let input;
    let token;

    const source_wallet_with_sufficient_balance = '-vQ8dgSE6hAzM_N_';
    const source_wallet_with_insufficient_balance = 'mPo0qpV3sM82s56k'; // 19,191.0000

    token = generateAccessToken(user.id);


    beforeEach(() => {
        jest.setTimeout(1000000000000000000000000);
        input = {
            amount: 1000,
            destination_wallet_id: '2tYViygHeZver2Bh'
        };
    });

    const makePostRequest = (source_wallet) => {
        postUrl = `/api/wallets/${source_wallet}/transfers`;
        return request(app)
            .post(postUrl)
            .set('x-auth-token', token)
            .send(input);
    }

    const makeGetRequest = (source_wallet) => {
        getUrl = `/api/wallets/${source_wallet}/transfers`;
        return request(app)
            .get(getUrl)
            .set('x-auth-token', token);
    }

    // it('should return 404 if the destination wallet does not exists', async () => {
    //
    // });

    // <!-- schema validation -->
    it('should return 400 if destination_wallet is not given', async () => {
        input.destination_wallet_id = '';
        const response = await makePostRequest(source_wallet_with_sufficient_balance);
        expect(response.status).toBe(400);
    });

    it('should return 400 if amount is not given', async () =>{
        input.amount = undefined;
        const response = await makePostRequest(source_wallet_with_sufficient_balance);
        expect(response.status).toBe(400);
    });

    it('should return 404 if the destination wallet is not found', async () => {
        input.destination_wallet_id = 'doesnotexists';
        const response = await makePostRequest(source_wallet_with_sufficient_balance);
        expect(response.status).toBe(404);
    });

    it('should return 400 error if balance is insufficient', async () => {
        input.amount = 30000;
        const response = await makePostRequest(source_wallet_with_insufficient_balance);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Insufficient wallet balance");
    });


    it('should return 200 when transfer is successful', async () => {
        const response = await makePostRequest(source_wallet_with_sufficient_balance);
        expect(response.status).toBe(201);
    });
});