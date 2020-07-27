import axios from 'axios'

const url = 'https://api.ratesapi.io/api/latest?'

/**
 * fetches Currenct Rates for selected Base Currency
 * @param {base Currency} selectedCurr 
 */
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
 * fetches historical data for base and timestamp
 * @param {specific date} dateUser 
 * @param {specific base Currency} baseUser 
 * @param {specific secondary Currency} secCurrUser 
 */
export const fetchHistoricalCurr =async (dateUser, baseUser, secCurrUser) =>{
    let currUrl = 'https://api.ratesapi.io/api/'+dateUser+'?base='+baseUser+'&symbols='+secCurrUser
    try{
        const {data: {rates}} = await axios.get(currUrl)
        return rates
    } catch(error){
        console.log(error)
    }
}

/**
 * processes the historical Data depending on the parameter month, year or tenYears
 * invokes fetchHistoricalCurr function for API calls
 * @param {String format for "month", "year", "tenYears"} histFormat 
 * @param {Date format 'YYYY-MM-DD'} date 
 * @param {Base Currency} base 
 * @param {Secondary Currency besides USD, EUR, JPY, GBP} secCurr 
 */
const processHistData = async (histFormat, date, base, secCurr)=>{
    // additional currencies for comparison
    var addCurr = ["USD","EUR","JPY","GBP"]
    for (var curr in addCurr){
        if(addCurr[curr] !== base){
            secCurr = secCurr+","+addCurr[curr]
        }
    }
    var histData = {}
    let currDate = new Date(date)
    var currRates, loadDate, limit
    switch (histFormat) {
        default :
            limit=32
            break;
        case "year":
            limit=13
            break;
        case "tenYears":
            limit=11
            break;
    }
    for(let i=0;i<limit;i++){
        loadDate = currDate.getFullYear()+'-'+(currDate.getMonth()+1)+'-'+currDate.getDate()
        currRates = await fetchHistoricalCurr(loadDate, base, secCurr)
        // map data for currency
        for (curr in currRates){
            if (histData[curr]=== undefined){
                histData[curr]={}
                histData[curr][0] = {histDate: loadDate, rate: currRates[curr]}
            }   else{
                histData[curr][Object.keys(histData[curr]).length] = {histDate: loadDate, rate: currRates[curr]}
            }
        }
        switch (histFormat) {
            default :
                currDate.setDate(currDate.getDate()-1)
                break;
            case "year":
                currDate.setMonth(currDate.getMonth()-1)
                break;                    
            case "tenYears":
                currDate.setFullYear(currDate.getFullYear()-1)
                break;
        }
    }
    return histData
}
/**
 * fetches daily data for a month, a year or 10 years
 */
export const histMonthData = async (date, base, secCurr)=>{
    return processHistData("month", date,base,secCurr)
}

export const histYearData = async(date, base, secCurr)=>{
    return processHistData("year", date,base,secCurr)
}

export const hist10YearData = async(date, base, secCurr)=>{
    return processHistData("tenYears", date,base,secCurr)
}


/**
 * 
 * @param {current Date} percDate 
 * @param {Base Currency} percBase 
 * @param {Secondary Currency} percSecCurr 
 * percentage through: ((today/yesterday)-1)*100
 */
export const currencyPercentage = async(percDate, percBase, percSecCurr)=> {
    var percentage= 0
    var secTodaysValue=0
    var secYesterdaysValue=0
    if(percBase!==percSecCurr){
        // todays value
        var currDate = new Date(percDate)
        var rates = await callRates('https://api.ratesapi.io/api/'+percDate+'?base='+percBase)
        secTodaysValue = rates[percSecCurr]
        // yesterdays value
        var yesterday = new Date(currDate.setDate(currDate.getDate()-1))
        var loadDate = yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getDate()
        var currUrl = 'https://api.ratesapi.io/api/'+loadDate+'?base='+percBase
        rates = await callRates(currUrl)
        secYesterdaysValue = rates[percSecCurr]
        percentage = ((secTodaysValue/secYesterdaysValue)-1)*100
    }
    return percentage
}
/**
 * API-calls for Rates
 * @param {api-url} url 
 */
export const callRates= async(url)=> {
    try{
        var {data: {rates}} = await axios.get(url)
        return rates
    } catch(error){
        console.log(error)
    }
}