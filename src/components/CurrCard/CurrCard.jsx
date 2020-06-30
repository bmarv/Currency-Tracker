import React from 'react'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import CountUp from 'react-countup'

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
                            <Grid item xs={12} md={6}>
                                <Typography color="textPrimary">
                                    {((props.currency===props.base) || (!props.rates[props.currency]))
                                        ? "1"
                                        : (<CountUp
                                            start={0}
                                            end={props.rates[props.currency]}
                                            duration={2.5}
                                            separator=" "
                                            decimals={4}
                                            decimal=","
                                            />)
                                        }
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography color="secondary">
                                    {props.percentage
                                        ?(
                                            (props.percentage>0)
                                            ?(<CountUp
                                                start={0}
                                                end={Number.parseFloat(props.percentage).toPrecision(3)}
                                                duration={2.5}
                                                separator=" "
                                                decimals={4}
                                                decimal=","
                                                prefix="+"
                                                suffix=" %"
                                                />)
                                            :(<CountUp
                                                start={0}
                                                end={Number(Number.parseFloat(props.percentage).toPrecision(3))}
                                                duration={2.5}
                                                separator=" "
                                                decimals={4}
                                                decimal=","
                                                suffix=" %"
                                                />))
                                        : <br />
                                    }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
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