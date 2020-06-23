import React from 'react'

const styles ={
    footer: {
        textAlign:'center',
        padding: '10px 0'
    }
}

const Footer = () => {
    return(
        <footer class="myFooter" style={styles.footer}>
            <p>Some footer nonesense</p>
        </footer>
    )
}

export default Footer