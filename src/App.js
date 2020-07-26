import React from 'react'
import {Grid} from '@material-ui/core'

import NavBar from './components/NavBar/NavBar'
import CurrencyPicker from './components/CurrencyPicker/CurrencyPicker'
import CurrCard from './components/CurrCard/CurrCard'
import CurrGraph from './components/CurrGraph/CurrGraph'
// import Footer from './components/Footer/Footer'

import {fetchCurrencies, histMonthData, currencyPercentage} from './api/index'

class App extends React.Component{
    state = {
        base: "EUR",
        secondaryCurrencies: ["USD"],
        secondaryPercentage:[null],
        currencies: [],
        rates: [],
        date: "",
        graphData:[{}],
        convertedPrimValue: null,
        convertedSecValue: null,
    }
    
    componentDidMount(){
        document.title = "Currency Tracker"
        var currencyList, dateValue, ratesList;
        fetchCurrencies().then(data => {
            currencyList =data[Object.keys(data)[0]]
            dateValue = data[Object.keys(data)[2]]
            ratesList = data[Object.keys(data)[1]]
            this.setState({
                currencies:currencyList,
                date: dateValue,
                rates: ratesList
            })
            var secCurrency= this.state.secondaryCurrencies[0]
            currencyPercentage(this.state.date, this.state.base, secCurrency).then(data =>{
                if(typeof data == "number"){
                    this.setState({secondaryPercentage: [data]
                    })
                }
                histMonthData(this.state.date, this.state.base,secCurrency).then(data => {
                    var graphValue = data
                    this.setState({
                        graphData: [graphValue]
                    })
                })
            })
        })
    }


    handlePrimaryCurrChange = async (currency) => {
        var dateValue, ratesList;
        fetchCurrencies(currency).then(data => {
            dateValue = data[Object.keys(data)[2]]
            ratesList = data[Object.keys(data)[1]]
            this.setState({
                base: currency,
                date: dateValue,
                rates: ratesList
            })
        
            // update secondary converted number
            var secValue = this.state.convertedSecValue
            var secCurrency = this.state.secondaryCurrencies[0]
            this.setState({
                convertedPrimValue: this.converter(secCurrency, currency, secCurrency, secValue),
            })
            
            // update currency percentage
            var dateCurr = this.state.date
            var baseCurrency = this.state.base
            currencyPercentage(dateCurr, baseCurrency, secCurrency).then(data =>{
                if(typeof data == "number"){
                    this.setState({secondaryPercentage: [data]
                    })
                }
                // update historical month data
                histMonthData(dateCurr, baseCurrency, secCurrency).then(data => {
                    var graphValue = data
                    this.setState({
                        graphData: [graphValue]
                    })
                })
            })
        })
    }

    handleSecondaryCurrChange = async (secCurrency) => {
        this.setState({
            secondaryCurrencies: [secCurrency],
        })
        // update secondary converted number
        var priValue = this.state.convertedPrimValue
        var baseCurr = this.state.base
        this.setState({
            convertedSecValue: this.converter(baseCurr, baseCurr, secCurrency, priValue),
        })

        // update secondary percentage
        currencyPercentage(this.state.date, this.state.base, secCurrency).then(data =>{
            if(typeof data == "number"){
                this.setState({
                    secondaryPercentage: [data]
                })
            }
            // update historical month data
            histMonthData(this.state.date, this.state.base, secCurrency).then(data => {
                var graphValue = data
                this.setState({
                    graphData: [graphValue]
                })
            })
        })
    }

    /**
     * converts the numerical input of one currency dynamically to the other currency
     * 
     * @param {currency of the numerical input} currency 
     * @param {base currency} baseCurrency 
     * @param {secondary currency} secondaryCurrency 
     * @param {numerical input} numberInput 
     */
    converter = (currency, baseCurrency, secondaryCurrency, numberInput) => {
        if(isFinite(numberInput)){
            var convertedNumber =0
            var rates = this.state.rates
            if(currency===baseCurrency){
                convertedNumber = numberInput * rates[secondaryCurrency]
                this.setState({
                    convertedSecValue: convertedNumber,
                    convertedPrimValue: numberInput
                })
            }
            else if(currency!==baseCurrency){
                convertedNumber = numberInput * (100/(rates[currency]*100))
                this.setState({
                    convertedPrimValue: convertedNumber,
                    convertedSecValue: numberInput
                })
            }
            return convertedNumber
        }   
        else{
            console.log("numberInput is not a Number")
        }
    }

    render(){
        const {base, secondaryCurrencies, secondaryPercentage, rates, date, graphData, convertedPrimValue, convertedSecValue} = this.state
        return(
            <div>
                <NavBar />
                <Grid container spacing={2}>
                    <Grid item md={6} container justify="center" spacing={2}>
                        <Grid item xs={6} md={6} >
                            <CurrencyPicker handleCurrChange={this.handlePrimaryCurrChange} currency={base}/>
                        </Grid>
                        <Grid item xs={6} md={6} >
                            <CurrencyPicker handleCurrChange={this.handleSecondaryCurrChange} currency={secondaryCurrencies[0]}/>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <CurrCard base={base} secCurrency={secondaryCurrencies[0]} currency={base} rates={rates} date={date} converter={this.converter} convertedValue={convertedPrimValue}/>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <CurrCard base={base} secCurrency={secondaryCurrencies[0]} currency={secondaryCurrencies[0]} percentage={secondaryPercentage[0]} rates={rates} date={date} converter={this.converter} convertedValue={convertedSecValue}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CurrGraph data={graphData[0]} secondaryCurrency={secondaryCurrencies[0]}/>
                    </Grid>
                </Grid>
                {/* <Footer /> */}
            </div>  
        )
    }
}

export default App