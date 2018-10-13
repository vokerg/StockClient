import React from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    textField: {
        margin: theme.spacing.unit,
        minWidth: 450,
    },
});

const EditProductAttributes = ({categories, getSelectedAttributes, handleAttributeChange, classes}) => {
    return (
        <Paper>
            {categories.map(category =>
                <div key={category.id}>
                    <FormControl className={classes.textField}>
                        <InputLabel htmlFor="cat-simple">{category.name}</InputLabel>
                        <Select
                            value={getSelectedAttributes(category)}
                            onChange={handleAttributeChange(category.id)}
                            inputProps={{
                                name: 'cat',
                                id: 'cat-simple',
                            }}
                        >
                            <MenuItem value={"0"}>{"Not specified"}</MenuItem>
                            {category.categoryAttributes.map(categoryAttribute =>
                                <MenuItem key={categoryAttribute.id}
                                          value={categoryAttribute.id}>{categoryAttribute.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
            )}
        </Paper>
    )
};

export default withStyles(styles)(EditProductAttributes);
