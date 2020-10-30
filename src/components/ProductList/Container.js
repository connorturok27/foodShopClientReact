import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import React from "react";
import ProductCard from "./Card";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    content: {
      marginTop: 10,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 300,
        width: 300,
    },
}));

export default function Content() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.content}>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid id="foodList" container justify="flex-start" spacing={2}>
                        <ProductCard/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
