import React from 'react'
// import Navbar from 'react-bootstrap/Navbar'
// import Container from 'react-bootstrap/Container'
import {AppBar, Typography} from '@material-ui/core'
// import currImage from './../../images/svg-currencies.png'

const styles={
    appbar: {
        alignItems: 'center',
    }
}

const NavBar = () => {
    return (
        <AppBar position="static" style={styles.appbar}>
            <div>
                <Typography variant="h4">Currency Tracker</Typography>
            </div>
                {/* <img className="photo" width={55} height={50} src={currImage} alt='currencyImage'/> */}
        </AppBar>
    )
}

export default NavBar