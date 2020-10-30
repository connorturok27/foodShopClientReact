import React, {useEffect, useState} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import {
    Card, CardActionArea, CardContent,
    Typography, CardMedia, Grid,
    TextField, InputLabel, Select,
    MenuItem, FormControl

} from '@material-ui/core';

import axios from 'axios'
import {getFood, getFoodTypes} from '../../routes/shop.routes'

import CollapseCardActions from "./CollapseCardActions";

import {Link} from "react-router-dom";


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

    searchRow: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        paddingBottom: '0.5rem'
    },

    searchInputs: {
        width: '90%',
    },

    formControl: {
        margin: theme.spacing(1),
        width: '90%',
    },
}));

export default function FoodCard() {
    const classes = useStyles();

    const [foodTypeTerm, setFoodTypeTerm] = useState("");
    const [foodType, setFoodType] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleFoodTypeFilter = event => {
        setFoodTypeTerm(event.target.value)
    }

    const handleSearch = event => {
        const searchTerm = event.target.value.length > 2
            ? event.target.value
            : '';
        setSearchTerm(searchTerm);
    };

    useEffect(() => {
            axios(getFoodTypes)
                .then(res => setFoodType(res.data))
        },
        []);

    useEffect(() => {
        axios(`${getFood}?search=${searchTerm}&foodType=${foodTypeTerm}`)
            .then(res => setSearchResults(res.data))
    }, [searchTerm, foodTypeTerm]);

    return (
        <>
            <Grid className={classes.searchRow} container>
                <Grid className={classes.search} item xs={12} sm={5} md={4} lg={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="foodTypeLabel">Tipos de Comidas</InputLabel>
                        <Select
                            labelId="foodTypeLabel"
                            id="searchByFoodType"
                            className={classes.searchInputs}
                            onChange={handleFoodTypeFilter}
                        >
                            {foodType.map(type => {
                                return (
                                    <MenuItem key={type.id} value={type.name}>{type.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid className={classes.search} item xs={12} sm={5} md={4} lg={3}>
                    <TextField id="searchByName"
                               className={classes.searchInputs}
                               label="Buscar..."
                               variant="outlined"
                               onChange={handleSearch}
                    />
                </Grid>
            </Grid>
            {searchResults.map((food) => {
                return (
                    <Grid key={food.id} item xs={12} sm={5} md={4} lg={3}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <Link to={`/${food.id}`}>
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        image={food.imageURL}
                                    >
                                    </CardMedia>
                                </Link>
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
