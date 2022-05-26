// const request = require('supertest');
// const app = require('../../../app');
// const { generateAccessToken, generateRefreshToken} = require('../../../utils/tokens');
//
//
//
// describe("User routes", () => {
//
//     const url = '/api/auth/users';
//
//     //TODO Test for invalid user inputs (ensuring joi works)
//
//     //TODO check how to revert changes done to the db by a test.
//
//         describe('POST api/auth/users', () => {
//
//             it('should register a new user.', async function () {
//                 const response = await request(app)
//                     .post(url)
//                     .send({
//                         firstname: "King",
//                         lastname: "David",
//                         email: "david@gmail.com",
//                         password: "myPassword1",
//                         confirm_password: "myPassword1"
//                     });
//
//                 expect(response.status).toBe(201);
//             });
//
//             it('should throw error message "email is required" if email is not given.', async function () {
//                 const response = await request(app)
//                     .post(url)
//                     .send({
//                         firstname: "given",
//                         lastname: "given",
//                         password: "myPassword1",
//                         confirm_password: "myPassword1"
//                     }).expect(400);
//
//                 expect(response.body.message).toBe('"email" is required');
//             });
//
//             it('should throw error if the confirm_password is not the same as the password', async function () {
//                  await request(app)
//                     .post(url)
//                     .send({
//                         firstname: "King",
//                         lastname: "David",
//                         email: "david@gmail.com",
//                         password: "myPassword1",
//                         confirm_password: "passwordDoesNotMatch"
//                     }).expect(400);
//             });
//         });
//
//     //TODO Test for duplicates email
//         describe('POST /api/auth/users' , () => {
//             it('should throw error when a users gives an email that has already been taken ', async function () {
//                 await request(app)
//                     .post(url)
//                     .send({
//                         firstname: "King",
//                         lastname: "David",
//                         email: "newEmail@gmail.com",
//                         password: "myPassword1",
//                         confirm_password: "myPassword1"
//                     });
//
//                 const response  = await request(app)
//                     .post(url)
//                     .send({
//                         firstname: "King",
//                         lastname: "David",
//                         email: "newEmail@gmail.com",
//                         password: "myPassword1",
//                         confirm_password: "myPassword1"
//                     });
//
//                 expect(response.status).toBe(422);
//                 expect(response.body.message).toEqual("Email is already taken");
//             });
//         });
//
//
//     //TODO Test for token being generated (in another file)
//     describe('Test token functions', () => {
//         it('should generate unique access token', function () {
//             expect(generateAccessToken(1)).not.toBeUndefined();
//         });
//
//         it('should generate unique refresh token', function () {
//             expect(generateRefreshToken(1)).not.toBeUndefined();
//         });
//     })
//
//     //TODO the user is saved
//     describe('POST api/auth/users', () => {
//         it('should save a new user to the database', async function () {
//             const response = request(app)
//                 .post(url)
//                 .send({
//                     firstname: "King",
//                     lastname: "David",
//                     email: "newEmail@gmail.com",
//                     password: "myPassword1",
//                     confirm_password: "myPassword1"
//                 });
//
//         });
//     })
//
//     //TODO Test for token saved in the headers
//
// });