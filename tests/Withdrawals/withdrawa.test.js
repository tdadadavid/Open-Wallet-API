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
    const wallet_with_cash = 'cYpYDcZv32lrzq1K';
    token = generateAccessToken(user.id);


    beforeEach(() => {
        jest.setTimeout(1000000000000000000000000);
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



    // TODO
    // learn how to generate custom error messages for each validation failure

    it('should return 400 error if amount is not provided', async () =>{
        input.amount = undefined;
        const response = await makePostRequest(wallet_with_cash);
        expect(response.status).toBe(400);
        // expect(response.body.message).toBe("Error! ");
    });

    it('should return 400 if amount is greater than the minimum withdrawal amount', async () => {
        input.amount = 90;
        const response = await makePostRequest(wallet_with_cash);
        expect(response.status).toBe(400);
    });

    it('should return 400 if the amount to be withdrawn is greater than amount in the wallet', async () => {
        input.amount = 100000;
        const response = await makePostRequest(wallet_with_no_cash);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Error! insufficient wallet balance");
    });

    it('should return 200 on successful withdrawal', async () => {
        input.amount = 432;
        const response = await makePostRequest(wallet_with_cash);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Transaction [withdrawal] successful");
    });

    it('should return 200 if the wallet has withdrawal history', async () => {
        input.amount = 1230;
        const response = await makeGetRequest(wallet_with_cash);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Here you go.");
    });

    it('should return 404 if the wallet has no withdrawal history', async () => {
        const response = await makeGetRequest(wallet_with_no_cash);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("This wallet has no Transaction [withdraw].")
    });

    it('should return the details of a withdrawal', async () => {
        const withdrawal_id = 'sxD9H2gtlnZiybT-Si';
        const response = await request(app)
                .get(`/api/wallets/${wallet_with_cash}/withdrawals/${withdrawal_id}`)
                .set('x-auth-token', token);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Here you go.");
    });

    it('should return 404 if the withdrawal doesn"t exists', async () => {
        const withdrawal_id = 'doesnotexist';
        const response = await request(app)
            .get(`/api/wallets/${wallet_with_cash}/withdrawals/${withdrawal_id}`)
            .set('x-auth-token', token);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe(`No withdrawal with this id ${withdrawal_id} found.`);
    });
});