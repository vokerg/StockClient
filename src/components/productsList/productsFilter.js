import React from 'react';
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 0,
        width: 200,
    },
});

const ProductsFilter = ({productFilter, onFilterChange, classes}) => {
    return (
        <div>
            <TextField
                label="Product filter"
                type="search"
                className={classes.textField}
                margin="normal"
                value={productFilter}
                onChange={onFilterChange}
            />
        </div>
    )
}

export default withStyles(styles)(ProductsFilter);