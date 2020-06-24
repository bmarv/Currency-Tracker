import axios from 'axios'

const url = 'https://api.ratesapi.io/api/latest?'

export const fetchCurrencies = async () =>{
    let currUrl = url
    try {
        const {data: {base, rates, date}} = await axios.get(currUrl)
        console.log(Object.keys(rates))
    } catch (error) {
        console.log(error)
    }
}