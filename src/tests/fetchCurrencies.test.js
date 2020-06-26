const fetchAPI = require('../api/index')
// import {sum} from '../api/index'


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