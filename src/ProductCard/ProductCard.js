import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
}));

const Card = () => {
    const [food, setFood] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:4000/shop/food');
            setFood(res.data)
        }
        fetchData();
    })

    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <div className={classes.root}>
                <GridList cellHeight={300} cols={3}>
                    {food.map(props => {
                        return (
                            <GridListTile key={props.imageURL}>
                                <img src={props.imageURL} alt={props.name} />
                                <GridListTileBar
                                    title={props.name}
                                />
                            </GridListTile>
                        )
                    })
                    }
                </GridList>
            </div>
        </Container>
    );
}
export default Card;
