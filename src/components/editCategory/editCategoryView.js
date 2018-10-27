import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const EditCategoryView = ({classes, name, onNameChange, multipleChoice, onMultipleChoiceChange, submitForm}) => {
    return (
        <form onSubmit={submitForm}>
            <div>
                <Paper className={classes.root} elevation={4}>
                    <TextField
                        label="Category name"
                        placeholder="Start typing"
                        className={classes.textField}
                        margin="normal"
                        value={name}
                        onChange={onNameChange}
                    />
                    <FormControlLabel control={
                        <Checkbox
                            checked={multipleChoice}
                            onChange={onMultipleChoiceChange}
                            value="Multiple choice"
                        />
                    } label="Multiple choice"/>
                    <Button type="submit">Save</Button>
                </Paper>
            </div>
        </form>
    )
};

export default withStyles(styles)(EditCategoryView);
