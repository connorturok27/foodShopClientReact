import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import List from "@material-ui/core/List";

export default function FoodPrices({prices}) {
    return (
        <List dense={true}>
            {prices.map(price => {
                return (
                    <ListItem key={price.id} alignItems='flex-start'>
                        <ListItemText
                            primary={price.size}
                            secondary={price.price}
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}
