import axios from 'axios'

const url = 'https://api.ratesapi.io/api/latest?'

export const fetchCurrencies = async (selectedCurr) =>{
    let currUrl = ""
    selectedCurr 
        ? (currUrl=url+"base="+selectedCurr)
        : currUrl=url
    console.log(currUrl)
    try {
        const {data: {base, rates, date}} = await axios.get(currUrl)
        var currencies = new Array()
        currencies = Object.keys(rates).sort()
        console.log(currencies, rates, date)
        return [currencies, rates, date]
    } catch (error) {
        console.log(error)
    }
    return currencies
}

