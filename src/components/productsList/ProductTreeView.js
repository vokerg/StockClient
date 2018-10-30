import React from 'react';

const ProductTreeView = ({product}) => {
    return (
        product.parents.reverse().map(tree => {
            return (
                <span>{tree.name} {"->"} </span>
            )
        })
    );
}

export default ProductTreeView;