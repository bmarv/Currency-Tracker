import React from 'react'
import {Grid} from '@material-ui/core'

import NavBar from './components/NavBar/NavBar'
import CurrencyPicker from './components/CurrencyPicker/CurrencyPicker'
import CurrCard from './components/CurrCard/CurrCard'
import CurrGraph from './components/CurrGraph/CurrGraph'
// import Footer from './components/Footer/Footer'

import {fetchCurrencies} from './api/index'

class App extends React.Component{
    state = {
        base: "EUR",
        secondaryCurrency: "USD",
        currencies: [],
        rates: [],
        date: "",
    }
    
    componentDidMount(){
        document.title = "Currency Tracker"
        var currencyList, dateValue, ratesList;
        fetchCurrencies().then(data => {
            currencyList =data[Object.keys(data)[0]]
            dateValue = data[Object.keys(data)[2]]
            ratesList = data[Object.keys(data)[1]]
            // console.log(Object.entries(ratesList))
            this.setState({
                currencies:currencyList,
                date: dateValue,
                rates: ratesList
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
        })
    }

    handleSecondaryCurrChange = async (secCurrency) => {
        this.setState({
            secondaryCurrency: secCurrency,
        })
    }

    render(){
        const {base, secondaryCurrency, rates, date } = this.state
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
                            <CurrCard base={base} currency={secondaryCurrency} rates={rates} date={date}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CurrGraph />
                    </Grid>
                </Grid>
                {/* <Footer /> */}
            </div>  
        )
    }
}

export default App