import React from 'react';
import queryString from 'query-string'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { insertProductTree, updateProductTree, getProductTree } from '../api';

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

class EditProductTree extends React.Component {

    state = { id: 0, name:"" };
    componentDidMount() {
        const {id} = this.props.match.params;
        if (id) {
            getProductTree(id)(tree => this.setState({...tree}));
        }
    }

    onNameChange = event => this.setState({ name: event.target.value });
    submitForm = event => {
        event.preventDefault();
        const {id} = this.props.match.params;
        const {parentId} = queryString.parse(this.props.location.search);

        console.log(parentId);
        const {push} = this.props.history;
        return id
            ? updateProductTree({ ...this.state })(() => push(`/products`))
            : insertProductTree({name:this.state.name}, parentId)(tree => push(`/products`));
    }

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.submitForm}>
                <div>
                    <Paper className={classes.root} elevation={4}>
                        <TextField
                            label="Tree name"
                            placeholder="Start typing"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                        <Button type="submit">Save</Button>
                    </Paper>
                </div>
            </form>
        )
    }
};

export default withStyles(styles)(EditProductTree);
