const fetchAPI = require('../api/index')


test('is currency an Object?', () => {
    return fetchAPI.fetchCurrencies().then(data => {
        expect(typeof data[Object.keys(data)[0]]).toBe("object")
    })
});

test('size of currencies is 33', () => {
    return fetchAPI.fetchCurrencies().then(data => {
        expect(data[Object.keys(data)[0]].length).toBe(33)
    }) 
})

test('size of rates is 32', () =>{
    return fetchAPI.fetchCurrencies().then(data => {
        expect(Object.entries(data[Object.keys(data)[1]]).length).toBe(32)
    })
})

//historical data
test('historical data is specified number', () => {
    return fetchAPI.fetchHistoricalCurr('2010-01-12', 'USD', 'GBP').then(data => {
        expect(data).toBe(0.6195704717)
    })
})

test('hist: month first rate is correct', () => {
    return fetchAPI.histMonthData('2010-01-12', 'USD', 'GBP').then(data =>{
        expect(data[Object.keys(data)[0]].rate).toBe(0.6195704717)
    })
})