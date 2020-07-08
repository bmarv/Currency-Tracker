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
        secondaryCurrency: "USD",
        secondaryPercentage:null,
        currencies: [],
        rates: [],
        date: "",
        graphData:{},
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
            var secCurrency= this.state.secondaryCurrency
            currencyPercentage(this.state.date, this.state.base, secCurrency).then(data =>{
                if(typeof data == "number"){
                    this.setState({secondaryPercentage: data
                    })
                }
                histMonthData(this.state.date, this.state.base,secCurrency).then(data => {
                    var graphValue = data
                    this.setState({
                        graphData: graphValue
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
            var dateCurr = this.state.date
            var baseCurrency = this.state.base
            var secCurrency= this.state.secondaryCurrency
            currencyPercentage(dateCurr, baseCurrency, secCurrency).then(data =>{
                if(typeof data == "number"){
                    this.setState({secondaryPercentage: data
                    })
                }
                histMonthData(dateCurr, baseCurrency, secCurrency).then(data => {
                    var graphValue = data
                    this.setState({
                        graphData: graphValue
                    })
                })
            })
        })
    }

    handleSecondaryCurrChange = async (secCurrency) => {
        this.setState({
            secondaryCurrency: secCurrency,
        })
        currencyPercentage(this.state.date, this.state.base, secCurrency).then(data =>{
            if(typeof data == "number"){
                this.setState({secondaryPercentage: data
                })
            }
            histMonthData(this.state.date, this.state.base, secCurrency).then(data => {
                var graphValue = data
                this.setState({
                    graphData: graphValue
                })
            })
        })
    }

    render(){
        const {base, secondaryCurrency, secondaryPercentage, rates, date, graphData } = this.state
        return(
            <div>
                <NavBar />
                <Grid container spacing={2}>
                    <Grid item md={6} container justify="center" spacing={2}>
                        <Grid item xs={6} md={6} >
                            <CurrencyPicker handleCurrChange={this.handlePrimaryCurrChange} currency={base}/>
                        </Grid>
                        <Grid item xs={6} md={6} >
                            <CurrencyPicker handleCurrChange={this.handleSecondaryCurrChange} currency={secondaryCurrency}/>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <CurrCard base={base} currency={base} rates={rates} date={date}/>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <CurrCard base={base} currency={secondaryCurrency} percentage={secondaryPercentage} rates={rates} date={date}/>
                        </Grid>
                        {/* <Grid item xs={6} md={6} >
                            <CurrencyPicker handleCurrChange={this.handleSecondaryCurrChange} currency={secondaryCurrency}/>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <CurrCard base={base} currency={secondaryCurrency} percentage={secondaryPercentage} rates={rates} date={date}/>
                        </Grid> */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CurrGraph data={graphData} secondaryCurrency={secondaryCurrency}/>
                    </Grid>
                </Grid>
                {/* <Footer /> */}
            </div>  
        )
    }
}

export default App