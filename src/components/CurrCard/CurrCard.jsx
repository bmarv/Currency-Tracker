import React from 'react'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'


const CurrCard = (props) => {
    if(!props.currency){
        return 'Please choose a Currency'
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} component={Card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography color="textSecondary">
                                    {props.currency}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="textPrimary">
                                    {((props.currency===props.base) || (!props.rates[props.currency]))
                                        ? "1"
                                        : props.rates[props.currency]}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="secondary">
                                    %
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="textSecondary">
                                    {new Date(props.date).toDateString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )

}

export default CurrCard