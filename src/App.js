import React from 'react'
import {Grid} from '@material-ui/core'

import NavBar from './components/NavBar/NavBar'
import CurrencyPicker from './components/CurrencyPicker/CurrencyPicker'
import CurrCard from './components/CurrCard/CurrCard'
import CurrGraph from './components/CurrGraph/CurrGraph'
import Footer from './components/Footer/Footer'

import {fetchCurrencies} from './api/index'

class App extends React.Component{
    state = {
        data: {},
    }
    
    componentDidMount(){
        document.title = "Currency Tracker"
        const fetchedCurrencies = fetchCurrencies("EUR")
        this.setState({data:fetchedCurrencies})
    }

    render(){
        return(
            <div>
                <NavBar />
                <Grid container spacing={2}>
                    <Grid item md={6} container justify="center" spacing={2}>
                        <Grid item xs={6} md={6} >
                            <CurrencyPicker />
                        </Grid>
                        <Grid item xs={6} md={6} >
                            <CurrencyPicker />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <CurrCard />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <CurrCard />
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