import React from 'react'
import {Grid} from '@material-ui/core'

import NavBar from './components/NavBar/NavBar'
import CurrencyPicker from './components/CurrencyPicker/CurrencyPicker'
import CurrCard from './components/CurrCard/CurrCard'
import CurrGraph from './components/CurrGraph/CurrGraph'
import Footer from './components/Footer/Footer'

class App extends React.Component{
    render(){
        return(
            <div>
                <NavBar />
                <Grid container spacing={2}>
                    <Grid item md={6} container>
                        <Grid item xs={6} md={6} justify="center">
                            <CurrencyPicker />
                        </Grid>
                        <Grid item xs={6} md={6} justify="center">
                            <CurrencyPicker />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CurrCard />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CurrCard />
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <CurrGraph />
                    </Grid>
                </Grid>
                <Footer />
            </div>  
        )
    }
}

export default App