import {combineReducers} from 'redux';

const loadParents = (id, trees) => {
    const result = [];
    let parent = trees.find(tree => tree.id === id);
    while (parent) {
        result.push(parent);
        parent = trees.find(tree => tree.id == parent.parentId);
    }
    return result;
}

const products = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_PRODUCTS':
            const prods = action.payload.products.map(product => {
                product.parents = loadParents(product.productTree.id, action.payload.productTrees);
                return product
            });
            return [...prods];
        default:
            return state;
    }
}

const productTrees = (state = [], action) => {
    switch (action.type) {
        case "LOAD_PRODUCTS" :
            return [...action.payload.productTrees];
        default:
            return state;
    }
}

const parentId = (state = 0, action) => {
    switch (action.type) {
        case "SET_PARENT_ID":
            return action.payload.parentId;
        default:
            return state;
    }
}

const isListView = (state=false, action) => {
    switch (action.type) {
        case "SET_LIST_VIEW": return !state;
        default: return state;
    }
}

const getTreeParentId = (treeId, state) => {
    const tree = state.productTrees.find(tree => tree.id === treeId);
    return (tree) ? tree.parentId : 0;
}

const isSubParent = (child, parent, state) => {
        if ((child !== 0) && (child !== parent)) {
            if (isSubParent(getTreeParentId(child, state), parent, state)) {
                return true;
            }
        }
        if (child === parent) {
            return true;
        }
        return false;
}

export const getProductTrees = state => state.productTrees.filter(tree => (!state.isListView) && (tree.parentId === state.parentId));
export const getProducts = state => state.products;
export const getProduct = (state, id) => state.products.find(product => product.id === id);
export const getProductsByCurrentParentId = state => state.products.filter(product =>
    (product.productTree.id === state.parentId) ||
        ((state.isListView) && ((state.parentId === 0) || isSubParent(product.productTree.id, state.parentId, state)))
);
export const getParentId = state => state.parentId;
export const getPreviousParentId = (state, parentId) => {
    const tree = state.productTrees.find(tree => tree.id === parentId);
    return tree ? tree.parentId : 0;
};
export const getIsListView = products => products.isListView;

export default combineReducers({productTrees, products, parentId, isListView});
