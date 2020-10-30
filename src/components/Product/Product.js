import React, {useState, useEffect} from "react";
import {useRouteMatch} from 'react-router-dom'
import {getFood} from '../../routes/shop.routes'
import axios from "axios";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Prices from "./Prices";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '1rem'
    },
    image: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        borderRadius: '2.5%'
    },
    productDetails: {
        paddingLeft: '1rem'
    }
}));

export default function Product() {
    const classes = useStyles();

    const {url} = useRouteMatch();
    const [food, setFood] = useState();
    const [error, setError] = useState()

    useEffect(() => {
            axios(`${getFood}${url}`)
                .then(res => setFood(res.data))
                .catch(e => setError(e))
        },
        [url]);
    if (error) {
        return (
            <Typography variant={'h5'}> Product {url} does not exist</Typography>
        )
    } else {
        if(food) {
            return (
                <Grid container className={classes.container}>
                    <Grid xs={12} sm={12} md={5} item>
                        <img src={food.imageURL} alt={food.name} className={classes.image}/>
                    </Grid>
                    <Grid xs={12} sm={12} md={5} item className={classes.productDetails}>
                        <Typography variant={"h4"}> {food.name}</Typography>
                        <Typography variant={"h6"}> Precios</Typography>
                        <Prices prices={food.prices}/>
                        <Button variant="contained" color="primary">
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
            )
        } else {
            return 'Loading...'
        }
    }
}
