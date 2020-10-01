import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Card, CardActionArea
    , CardContent, Typography, CardMedia, Grid
} from '@material-ui/core';
import {useQuery} from 'react-query'
import axios from 'axios'
import {getFoodList} from '../../routes/shop.routes'
import CollapseCardActions from "./CollapseCardActions";


const useStyles = makeStyles((theme) => ({
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

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function FoodCard() {
    const classes = useStyles();

    const {isLoading, error, data} = useQuery("foodList", () =>
        axios(getFoodList).then(res => res.data)
    );

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <>
            {data.map((food) => {
                return (
                    <Grid key={food.id} item xs={12} sm={5} md={4} lg={3}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <a href={`http://foodshop/${food.id}`}>
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
                            <CollapseCardActions prices={food.prices}/>
                        </Card>
                    </Grid>
                )
            })}
        </>
    )

}
