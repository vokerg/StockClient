import React from 'react';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

const EditProductView = ({children, submitForm, name, onNameChange, onProductTreeChange, productTree, productTrees, classes}) => {
    return (
        <form onSubmit={this.submitForm}>
            <div>
                <Paper className={classes.root} elevation={4}>
                    <TextField
                        label="Product name"
                        placeholder="Start typing"
                        className={classes.textField}
                        margin="normal"
                        value={name}
                        onChange={onNameChange}
                    />
                    <Select
                        label="Product tree"
                        className={classes.textField}
                        value={productTree.id}
                        onChange={onProductTreeChange}
                    >
                        {productTrees.map(tree =>
                            <MenuItem key={tree.id} value={tree.id}>{tree.name}</MenuItem>
                        )}
                    </Select>
                </Paper>
                {children}
                <Button type="submit">Save</Button>
            </div>
        </form>
    )
}

export default withStyles(styles)(EditProductView);