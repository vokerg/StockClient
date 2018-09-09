import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

import {getProduct, getProductTrees, insertProduct, updateProduct, getCategories, getProductAttributes} from '../api';
import queryString from "query-string";

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
    state = {name: "", productTree: {id: 0}, productTrees: [], categories: []};
    onProductTreeChange = event => this.setState({productTree: {id: event.target.value}});
    onNameChange = event => this.setState({name: event.target.value});
    submitForm = event => {
        event.preventDefault();
        const {id} = this.props.match.params;
        const {name, productTree, categories} = this.state;

        const categoryAttributeProducts =
            categories.map(cat => [
                ...cat.categoryAttributes
                    .filter(catAttr => catAttr.selected)
                    .map(({id}) => ({categoryAttribute: {id}}))
            ])
                .reduce((arr, item) => [...arr, ...item], []);

        const {push} = this.props.history;
        return id
            ? updateProduct({id, name, productTree, categoryAttributeProducts})(() => push(`/products/${id}`))
            : insertProduct({name, productTree, categoryAttributeProducts})(product =>
                push(`/products/${product.id}`));
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        getProductTrees(productTrees => this.setState({productTrees}));
        if (id) {
            getProduct(id)(product => this.setState({...product}));
        } else {
            const parentId = parseInt(queryString.parse(this.props.location.search).parentId);
            if (parentId) {
                this.setState({productTree: {id: parentId}});
            }
        }

        getCategories(cats => {
            getProductAttributes(id)(productAttributes => {
                const catAttrs = productAttributes.map(prAttr => prAttr.categoryAttribute.id);
                const categories = cats.map(category => ({
                    ...category,
                    categoryAttributes: category.categoryAttributes.map(categoryAttribute => ({
                        ...categoryAttribute, selected: catAttrs.includes(categoryAttribute.id)
                    }))
                }));
                this.setState({categories});
            });
        });
    }

    handleAttributeChange = categoryId => event => {
        console.log(categoryId, event.target.value);
        this.setState({
            categories: this.state.categories.map(category => {
                return category.id !== categoryId ? category :
                    {
                        ...category, categoryAttributes: category.categoryAttributes.map(catAttr =>
                            catAttr.id === event.target.value ? {...catAttr, selected: true} : {
                                ...catAttr,
                                selected: false
                            })
                    }
            })
        });
    }

    getSelectedAttributes = category => {
        const selected = category.categoryAttributes.filter(catAttr => catAttr.selected === true).map(catAttr => catAttr.id);
        return category.multipleChoice ? selected : selected.length === 0 ? null : selected[0];
    }


    render() {
        console.log("state", this.state);
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
                            label="Product tree"
                            className={classes.textField}
                            value={this.state.productTree.id}
                            onChange={this.onProductTreeChange}
                        >
                            {this.state.productTrees.map(tree =>
                                <MenuItem value={tree.id}>{tree.name}</MenuItem>
                            )}
                        </Select>
                    </Paper>
                    <Paper>
                        {this.state.categories.map(category => {
                            return (
                                <div>
                                    {category.name}
                                    <Select
                                        value={this.getSelectedAttributes(category)}
                                        onChange={this.handleAttributeChange(category.id)}
                                    >
                                        {category.categoryAttributes.map(categoryAttribute => {
                                            return (
                                                <MenuItem
                                                    value={categoryAttribute.id}>{categoryAttribute.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </div>
                            )
                        })}
                    </Paper>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        )
    }
}

export default withStyles(styles)(EditProduct);
