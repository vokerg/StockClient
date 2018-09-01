const productTrees = (state=[], action) => {
    switch (action.type) {
        case "LOAD_PRODUCT_TREES" :
            return [...action.payload.productTrees];
            break;
        default: return state;
    }
}

export const getProductTrees = state => state

export default productTrees;
