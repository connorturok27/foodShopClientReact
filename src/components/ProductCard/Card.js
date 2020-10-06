import React, {useEffect, useState} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import {
    Card, CardActionArea
    , CardContent, Typography, CardMedia, Grid
} from '@material-ui/core';
import axios from 'axios'
import {getFoodList} from '../../routes/shop.routes'
import CollapseCardActions from "./CollapseCardActions";
import TextField from "@material-ui/core/TextField";


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
      paddingBottom: '1rem'
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '75%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

}));

export default function FoodCard() {
    const classes = useStyles();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        if(event.target.value.split('').length > 2) {
            setSearchTerm(event.target.value);
        } else {
            setSearchTerm('');
        }
    };

    useEffect(() => {
        axios(`${getFoodList}?search=${searchTerm}`)
            .then(res => setSearchResults(res.data))
    }, [searchTerm]);

    return (
        <>
            <Grid xs={12} className={classes.searchRow}>
                <div className={classes.search}>
                    <TextField id="search"
                               label="Buscar..."
                               variant="outlined"
                               onChange={handleChange}
                    />
                </div>
            </Grid>
            {searchResults.map((food) => {
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
