const request = require('supertest');
const app = require('../app');
const { generateAccessToken, generateRefreshToken} = require('../utils/tokens');
const { connectToDatabase, truncateTable, closeConnection } = require('../database');


describe("User routes", () => {

    beforeAll(() => {
        jest.setTimeout(1000000000000000000000);
        connectToDatabase();
    });

    beforeEach(() => {
        jest.setTimeout(1000000000000000000000);
        truncateTable("test_users");
    });

    afterAll(() => {
        jest.setTimeout(1000000000000000000000);
        closeConnection();
    })

    const url = '/api/auth/users';
    const validUserInputs = {
        firstname: "King",
        lastname: "David",
        email: "newEmail@gmail.com",
        password: "myPassword1",
        confirm_password: "myPassword1"
    };

    //TODO Test for invalid user inputs (ensuring joi works)

    describe('POST api/auth/users', () => {

        it('should register a new user.', async function () {
            const response = await request(app)
                .post(url)
                .send(validUserInputs);

            expect(response.status).toBe(201);
        });

        it('should throw error message "email is required" if email is not given.', async function () {
            const response = await request(app)
                .post(url)
                .send({
                    firstname: "given",
                    lastname: "given",
                    password: "myPassword1",
                    confirm_password: "myPassword1"
                }).expect(400);

            expect(response.body.message).toBe('"email" is required');
        });

        it('should throw error if the confirm_password is not the same as the password', async function () {
            await request(app)
                .post(url)
                .send({
                    firstname: "King",
                    lastname: "David",
                    email: "david@gmail.com",
                    password: "myPassword1",
                    confirm_password: "passwordDoesNotMatch"
                }).expect(400);
        });


        //TODO Test for duplicates email
        it('should throw error when a users gives an email that has already been taken ', async () => {

            await request(app)
                .post(url)
                .send({
                    firstname: "King",
                    lastname: "David",
                    email: "newEmail@gmail.com",
                    password: "myPassword1",
                    confirm_password: "myPassword1"
                });

            const response = await request(app)
                .post(url)
                .send({
                    firstname: "King",
                    lastname: "David",
                    email: "newEmail@gmail.com",
                    password: "myPassword1",
                    confirm_password: "myPassword1"
                });

            expect(response.status).toBe(422);
            expect(response.body.message).toEqual("Email is already taken");
        });


        //TODO Test for token being generated (in another file)
        describe('Test token functions', () => {
            it('should generate unique access token', function () {
                expect(generateAccessToken(1)).not.toBeUndefined();
            });

            it('should generate unique refresh token', function () {
                expect(generateRefreshToken(1)).not.toBeUndefined();
            });
        });


        //TODO Test for user being return after registration
        it('should return the new user details in json',  async () => {
            const response = await request(app)
                .post(url).send(validUserInputs);

            expect(response.body.data.firstname).toEqual("King");
            expect(response.body.message).toEqual("New user registered");
        });


        //TODO  Test for token saved in the headers
        it('should return true if the header has auth-token', async () => {
            const response = await request(app)
                .post(url).send(validUserInputs);

            expect(response.header['auth-token']).toBeDefined();

        });


        //TODO Test for error while registering user
        // it will only pass when the database fails
        it('should throw 500 status && Oops! an error occurred', async () => {
            const response = await request(app)
                .post(url).send(validUserInputs);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Oops! an error occurred");
        });

    });

});