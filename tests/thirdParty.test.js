const converter = require('../services/exchangeRates')


// check the current exchange rate before running this test
it('should return the amount converted', async () => {
    const response = await converter.getConversion('USD', 'NGN',1090);
    console.log(response);
    expect(response.result).toBeGreaterThan(452513.5763); // the rates fluctuates
});
