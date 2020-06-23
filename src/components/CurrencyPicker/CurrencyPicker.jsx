import React from 'react'
import {FormControl, NativeSelect} from '@material-ui/core'

import styles from './CurrencyPicker.module.css'

const CurrencyPicker = () => {
    return(
        <div>
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue="global">
                    <option value="">Global</option>
                    <option value="">random</option>
                </NativeSelect>
            </FormControl>
    </div>
    )
}

export default CurrencyPicker