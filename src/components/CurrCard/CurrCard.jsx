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
                                <Typography color="h1">
                                    NR
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="h2">
                                    %
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color="h5">
                                    yesterday
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