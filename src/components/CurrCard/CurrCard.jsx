import React from 'react'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'


const CurrCard = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} component={Card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography color="textSecondary">
                                    USD
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="textPrimary">
                                    NR
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="secondary">
                                    %
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="textPrimary">
                                    current Date
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