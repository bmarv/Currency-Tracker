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

// //historical data
// test('historical data is specified number', () => {
//     return fetchAPI.fetchHistoricalCurr('2010-01-12', 'USD', 'GBP').then(data => {
//         expect(data).toBe(0.6195704717)
//     })
// })

// test('hist: month first rate is correct', () => {
//     return fetchAPI.histMonthData('2010-01-12', 'USD', 'GBP').then(data =>{
//         expect(data[Object.keys(data)[0]].rate).toBe(0.6195704717)
//     })
// })

// test('percent of US: 29./30.06.', () => {
//     return fetchAPI.currencyPercentage('2020-06-30','EUR', 'USD').then(data => {
//         expect(Number.parseFloat(data).toPrecision(3)).toBe("-0.762")
//     })
// })

var todayval, yesterdayval
test('callRates: (todays value AUD-INR)', () => {
    return fetchAPI.callRates('https://api.ratesapi.io/api/2020-07-07?base=AUD').then(data => {
        todayval=data['INR']
        console.log(todayval)
        expect(Number.parseFloat(data['INR']).toPrecision(3)).toBe('51.9')
    })
})

test('callRates: (yesterdays value AUD-INR)', () => {
    return fetchAPI.callRates('https://api.ratesapi.io/api/2020-07-06?base=AUD').then(data => {
        yesterdayval=data['INR']
        expect(Number.parseFloat(data['INR']).toPrecision(3)).toBe('52.0')
    })
})

test('perc of AUD to INR: 6.7./7.7.', () => {
    return fetchAPI.currencyPercentage('2020-07-07','AUD','INR').then(data => {
        var percVal = ((todayval/yesterdayval)-1)*100
        expect(Number.parseFloat(data).toPrecision(3)).toBe(Number.parseFloat(percVal).toPrecision(3))
    })
})