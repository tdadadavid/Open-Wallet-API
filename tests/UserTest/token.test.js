const {generateAccessToken, generateRefreshToken} = require("../utils/tokenFunc");

describe('Test token functions', () => {
    it('should generate unique access token', function () {
        expect(generateAccessToken(1)).not.toBeUndefined();
    });

    it('should generate unique refresh token', function () {
        expect(generateRefreshToken(1)).not.toBeUndefined();
    });

    it('should return error when no user id is given', async () => {
        expect(generateAccessToken().toString()).toMatch("User id not defined");
    });

    it('should return error when no user id is given', async () => {
        expect(generateRefreshToken().toString()).toMatch("User id not defined");
    });
});