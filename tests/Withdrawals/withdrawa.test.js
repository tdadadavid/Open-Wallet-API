const request = require('supertest');
const app = require('../../app');
const User = require('../../components/Users/models/User')
const {generateAccessToken} = require("../../utils/tokenFunc");



describe('Withdrawal module', () => {

    let user = new User();
    let postUrl;
    let getUrl;
    let input;
    let token;

    const wallet_with_no_cash = '2tYViygHeZver2Bh';
    const wallet_with_cash = 'cYpYDcZv32lrzq1K'


    beforeEach(() => {
        token = generateAccessToken(user.id);
        input = { amount: 1000 };
    });

    const makePostRequest = (wallet_id) => {
        postUrl = `/api/wallets/${wallet_id}/withdrawals`;
        return request(app)
            .post(postUrl)
            .set('x-auth-token', token)
            .send(input);
    }

    const makeGetRequest = (wallet_id) => {
        getUrl = `/api/wallets/${wallet_id}/withdrawals`;
        return request(app)
            .get(getUrl)
            .set('x-auth-token', token);
    }


    it('should return 400 error if amount is not provided', async () =>{
        const response = await makeGetRequest(wallet_with_cash);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Transaction [withdrawal] failed, no amount provided");
    });
})