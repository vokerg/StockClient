import {combineReducers} from 'redux';

const products = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_PRODUCTS':
            return [...action.payload.products];
        default:
            return state;
    }
}

const productTrees = (state = [], action) => {
    switch (action.type) {
        case "LOAD_PRODUCT_TREES" :
            return [...action.payload.productTrees];
            break;
        default:
            return state;
    }
}

const parentId = (state = 0, action) => {
    switch (action.type) {
        case "SET_PARENT_ID":
            return action.payload.parentId;
            break;
        default:
            return state;
    }
}

export const getProductTrees = state => state.productTrees.filter(tree => tree.parentId === state.parentId);
export const getProducts = state => state.products;
export const getProduct = (state, id) => state.products.find(product => product.id === id);
export const getProductsByCurrentParentId = state => state.products.filter(product => product.productTree.id === state.parentId);
export const getParentId = state => state.parentid;
export const getPreviousParentId = (state, parentId) => {
    const tree = state.productTrees.find(tree => tree.id === parentId);
    return tree ? tree.parentId : 0;
};

export default combineReducers({productTrees, products, parentId});
