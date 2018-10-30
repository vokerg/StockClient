import React from 'react';
import {connect} from 'react-redux';

import {fetchProducts, setParentId} from '../actions';
import ProductsList from './productsList';

const redirectToProductId = push => productId => () => push(`products/${productId}`);

const Products = ({history, fetchProducts, fetchProductTrees, initializeParentId}) => {
    initializeParentId();
    fetchProducts();
    return (
        <div>
            <ProductsList selectProduct={redirectToProductId(history.push)}/>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    initializeParentId: () => dispatch(setParentId(0))
})

export default connect(() => ({}), mapDispatchToProps)(Products);
