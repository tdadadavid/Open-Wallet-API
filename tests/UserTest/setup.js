const {connectToDatabase, truncateTable, closeConnection} = require("../../database");


function setup() {
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
}


module.exports = setup;