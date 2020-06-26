import React, {useState, useEffect} from 'react'
import {FormControl, NativeSelect} from '@material-ui/core'

import styles from './CurrencyPicker.module.css'
import {fetchCurrencies} from '../../api/index'

const CurrencyPicker = ({handleCurrChange}) => {
    const [fetchedData, setFetchedData]= useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedCurr = await fetchCurrencies()
            setFetchedData(fetchedCurr[Object.keys(fetchedCurr)[0]])
        }

        fetchAPI()
    }, [setFetchedData])

    return(
        <div>
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue="" onChange={(e) => handleCurrChange(e.target.value)}>
                {fetchedData.sort().map((currency, i) => <option key={i} value={currency}>{currency}</option>)}
                </NativeSelect>
            </FormControl>
    </div>
    )
}

export default CurrencyPicker