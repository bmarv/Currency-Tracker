import React from 'react'
// import Navbar from 'react-bootstrap/Navbar'
// import Container from 'react-bootstrap/Container'
import {AppBar, Typography} from '@material-ui/core'

const styles={
    appbar: {
        alignItems: 'center',
    }
}

const NavBar = () => {
    return (
        <AppBar position="static" style={styles.appbar}>
            <Typography variant="h3">Currency Tracker</Typography>
        </AppBar>
    )
}

export default NavBar