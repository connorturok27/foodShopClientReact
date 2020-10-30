import {Checkbox, FormGroup, FormControlLabel} from "@material-ui/core";
import React from "react";
import {Grid} from "@material-ui/core";

export default function Product({prices}) {
    return (
        <FormGroup row>
            {prices.map(price => {
                return (
                    <Grid xs={12} item>
                        <FormControlLabel
                            key={price.id}
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label={`${price.size}: ${price.price}`}
                        />
                    </Grid>
                )
            })}
        </FormGroup>
    )
}
