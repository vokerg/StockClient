import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

import {getProduct, getProductTrees, insertProduct, updateProduct} from '../api';
import SelectProduct from "./editDocument/selectProduct";

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

class EditProduct extends React.Component {
    state = {name: "", productTreeId: 0, productTrees: []};
    onProductTreeChange = event => this.setState({ productTreeId: event.target.value });

    componentDidMount() {
        const {id} = this.props.match.params;
        getProductTrees()(productTrees => this.setState({productTrees}))
        if (id) {
            getProduct(id)(product => this.setState({...product}));
        }
    }

    onNameChange = event => this.setState({name: event.target.value});
    submitForm = event => {
        event.preventDefault();
        const {id} = this.props.match.params;
        const {name, productTreeId} = this.state;
        const {push} = this.props.history;
        return id
            ? updateProduct({id, name, productTreeId})(() => push(`/products/${id}`))
            : insertProduct({name, productTreeId})(product => push(`/products/${product.id}`));
    }

    render() {
        const {classes} = this.props;
        return (
            <form onSubmit={this.submitForm}>
                <div>
                    <Paper className={classes.root} elevation={4}>
                        <TextField
                            label="Product name"
                            placeholder="Start typing"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                        <Select
                            value={this.state.productTreeId}
                            onChange={this.onProductTreeChange}
                        >
                            {this.state.productTrees.map(tree =>
                                <MenuItem id={tree.id}>{tree.name}</MenuItem>
                            )}
                        </Select>
                        <Button type="submit">Save</Button>
                    </Paper>
                </div>
            </form>
        )
    }
}

export default withStyles(styles)(EditProduct);
