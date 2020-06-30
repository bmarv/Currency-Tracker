import axios from 'axios'

const url = 'https://api.ratesapi.io/api/latest?'

export const fetchCurrencies = async (selectedCurr) =>{
    let currUrl = ""
    selectedCurr 
        ? (currUrl=url+"base="+selectedCurr)
        : currUrl=url
    try {
        const {data: {base, rates, date}} = await axios.get(currUrl)
        var currencies = []
        currencies = Object.keys(rates) 
        !selectedCurr
            ? currencies.push(base)
            : 
        currencies.sort()

        return {currencies, rates, date}
    } catch (error) {
        console.log(error)
    }
}

/** 
 * fetch historical data for base and timestamp
 */
export const fetchHistoricalCurr =async (dateUser, baseUser, secCurrUser) =>{
    let currUrl = 'https://api.ratesapi.io/api/'+dateUser+'?base='+baseUser+'&symbols='+secCurrUser
    try{
        const {data: {base, rates, date}} = await axios.get(currUrl)
        return rates[Object.keys(rates)[0]]
    } catch(error){
        console.log(error)
    }
}

/**
 * fetch daily data for a month
 */
export const histMonthData = async (date, base, secCurr)=>{
    let currDate = new Date(date)
    var dailyData = {}
    var currRate, loadDate
    for(let i=0;i<30;i++){
        loadDate = currDate.getFullYear()+'-'+(currDate.getMonth()+1)+'-'+currDate.getDate()
        currRate = await fetchHistoricalCurr(loadDate, base, secCurr)
        dailyData[Object.keys(dailyData).length] = {histDate: loadDate, rate: currRate}
        currDate.setDate(currDate.getDate()-1)
    }
    return dailyData
}