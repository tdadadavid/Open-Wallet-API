const request = require('supertest');
const app = require('../../app');
const {generateAccessToken} = require("../../utils/tokenFunc");


describe('Transaction module', () => {

    //TODO check if a user can see another user wallet.
    let download_url;
    let get_transactions_url;
    const token = generateAccessToken('R2POLxqGo6bv')

    const makeGetRequest = (wallet_id) => {
        get_transactions_url = `/api/wallets/${wallet_id}/transactions`;

        return request(app)
            .get(get_transactions_url)
            .set('x-auth-token', token);
    }

    const makeDownloadRequest = (wallet_id) => {
        download_url = `/api/wallets/${wallet_id}/transactions/download`;
        return request(app)
            .get(download_url)
            .set('x-auth-token', token);
    }

    it('should return 200 for returning wallets that has no transaction', async () => {
        const response = await makeGetRequest('2J_Ca0pG_SkvRXxd');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Here you go.");
    });

    it('should return 200 for returning', async () => {
        const response = await makeGetRequest('cYpYDcZv32lrzq1K');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Here you go.");
    });

});