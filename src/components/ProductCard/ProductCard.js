import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Card, CardActions, CardActionArea
    , CardContent, Button, Typography, CardMedia, Grid
} from '@material-ui/core';
import {useQuery} from 'react-query'
import axios from 'axios'
import {getFoodList} from '../../routes/shop.routes'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundColor: '#DFD1CE'
    },

    title: {
        paddingLeft: '0.1rem',
        color: '#B36851',
    },

    media: {
        height: 300,
    },
});

export default function FoodCard() {
    const classes = useStyles();

    const {isLoading, error, data} = useQuery("foodList", () =>
        axios(getFoodList).then(res => res.data)
    );

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <>
            {data.map((food, index) => {
                return (
                    <Grid key={index} item xs={12} sm={5} md={4} lg={3}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <a href="http://google.com">
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        image={food.imageURL}
                                    >
                                    </CardMedia>
                                </a>
                                <CardContent>
                                    <Typography className={classes.title}
                                                gutterBottom variant="h5" component="h2"
                                                align="left">
                                        {food.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <CardActions>
                                <Button size="small">Check</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </>
    )

}
