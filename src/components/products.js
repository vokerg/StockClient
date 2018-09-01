import React from 'react';
import {connect} from 'react-redux';

import {fetchProducts, fetchProductTrees} from '../actions';
import ProductsList from './productsList';

const redirectToProductId = push => productId => () => push(`products/${productId}`);

const Products = ({history, fetchProducts, fetchProductTrees}) => {
    fetchProducts();
    fetchProductTrees();
    return (
        <div>
            <ProductsList selectProduct={redirectToProductId(history.push)}/>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductTrees: () => dispatch(fetchProductTrees())
})

export default connect(() => ({}), mapDispatchToProps)(Products);
