import React from 'react';
import queryString from "query-string";

import {
    getProduct,
    getProductTrees,
    insertProduct,
    updateProduct,
    getCategories,
    getProductAttributes
} from '../../api';
import EditProductAttributes from './editProductAttributes';
import EditProductView from './editProductView';

class EditProduct extends React.Component {
    state = {name: "", productTree: {id: 0}, productTrees: [], categories: []};
    onProductTreeChange = event => this.setState({productTree: {id: event.target.value}});
    onNameChange = event => this.setState({name: event.target.value});

    getOrganizedCategoryAttributeProducts = () =>
        this.state.categories.map(cat => [
            ...cat.categoryAttributes
                .filter(catAttr => catAttr.selected)
                .map(({id}) => ({categoryAttribute: {id}}))
        ])
            .reduce((arr, item) => [...arr, ...item], []);

    submitForm = event => {
        event.preventDefault();
        const {id} = this.props.match.params;
        const {name, productTree} = this.state;

        const categoryAttributeProducts = this.getOrganizedCategoryAttributeProducts();

        const {push} = this.props.history;
        return id
            ? updateProduct({id, name, productTree, categoryAttributeProducts})(() => push(`/products/${id}`))
            : insertProduct({name, productTree, categoryAttributeProducts})(product =>
                push(`/products/${product.id}`));
    }

    handleAttributeChange = categoryId => event =>
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

    getSelectedAttributes = category => {
        const selected = category.categoryAttributes
            .filter(catAttr => catAttr.selected === true)
            .map(catAttr => catAttr.id);
        return category.multipleChoice ? selected : selected.length === 0 ? null : selected[0];
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

    render() {
        return (
            <EditProductView
                submitForm={this.submitForm}
                name={this.state.name}
                onNameChange={this.onNameChange}
                onProductTreeChange={this.onProductTreeChange}
                productTree={this.state.productTree}
                productTrees={this.state.productTrees}
            >
                <EditProductAttributes
                    categories={this.state.categories}
                    getSelectedAttributes={this.getSelectedAttributes}
                    handleAttributeChange={this.handleAttributeChange}
                />
            </EditProductView>
        )
    }
}

export default EditProduct;
