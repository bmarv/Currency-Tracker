import axios from 'axios'

const url = 'https://api.ratesapi.io/api/latest?'

export const fetchCurrencies = async (selectedCurr) =>{
    let currUrl = ""
    selectedCurr 
        ? (currUrl=url+"base="+selectedCurr)
        : currUrl=url
    // console.log(currUrl)
    try {
        const {data: {base, rates, date}} = await axios.get(currUrl)
        var currencies = []
        currencies = Object.keys(rates) 
        !selectedCurr
            ? currencies.push(base)
            : 
        currencies.sort()

        // console.log(Object.entries(rates))
        return {currencies, rates, date}
    } catch (error) {
        console.log(error)
    }
    // return currencies
}

// export const add = (a,b) => {
//     return a+b
// }
