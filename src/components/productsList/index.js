import React from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

import ProductsToolbar from './productsToolbar';
import {getProductTrees, getProductsByCurrentParentId, getParentId, getPreviousParentId, getIsListView} from '../../reducers';
import {setListView, setParentId} from '../../actions';
import ProductsFilter from "./productsFilter";
import ProductTreeView from "./ProductTreeView";

class ProductsList extends React.Component {

    state = ({productFitler: ''});

    onFilterChange = event => this.setState({productFitler: event.target.value});
    onTreeClick = parentId => event => this.props.setParentId(parentId);
    goBack = parentId => () =>
        this.props.setParentId(this.props.previousParentId(parentId));

    render() {
        const showProducts = this.props.products.filter(product =>
            product.name.toUpperCase().includes(this.state.productFitler.toUpperCase())
        )
        const {productTrees, parentId} = this.props;
        return (
            <div>
                <ProductsToolbar parentId={parentId} changeListView={this.props.setListView} isListView={this.props.getIsListView}/>
                <ProductsFilter productFilter={this.state.productFilter} onFilterChange={this.onFilterChange}/>
                <IconButton onClick={this.goBack(parentId)}>
                    <ArrowBack/>
                </IconButton>
                <List>
                    {productTrees.map((productTree, key) =>
                        <ListItem
                            key={key}
                            role={undefined}
                            dense
                            button
                            onClick={this.onTreeClick(productTree.id)}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={productTree.name}/>
                        </ListItem>
                    )}
                    {showProducts.map((product, key) =>
                        <ListItem
                            key={key}
                            role={undefined}
                            dense
                            button
                            onClick={this.props.selectProduct(product.id)}
                        >
                            {(this.props.selectedProductId === product.id) &&
                            <Checkbox
                                checked={true}
                                tabIndex={-1}
                                disableRipple
                            />
                            }
                            <ListItemText>
                                <span>{product.name}</span>
                                <ProductTreeView product={product}/>
                            </ListItemText>

                        </ListItem>
                    )}
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    productTrees: getProductTrees(state),
    products: getProductsByCurrentParentId(state),
    parentId: getParentId(state),
    getIsListView: getIsListView(state),
    previousParentId: parentId => getPreviousParentId(state, parentId)
});

const mapDispatchToProps = dispatch => ({
    setParentId: id => dispatch(setParentId(id)),
    setListView: () => dispatch(setListView())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
