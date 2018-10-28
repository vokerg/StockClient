import {getProducts, getProductTrees} from '../api';
import {getCurrentUserId} from '../reducers';

export const stateLogin = (authorization, user) => ({
    type: 'LOGIN',
    payload: {
        authorization,
        user
    }
});

export const stateLogout = () => ({
    type: 'LOGOUT'
});

export const saveDraftDocument = payload => ({
    type: 'SAVE_DRAFT',
    payload
});

export const clearDraft = draftId => ({
    type: 'CLEAR_DRAFT',
    payload: {draftId}
});

export const visit = (textDescription, url) => ({
    type: 'ADD_VISIT',
    payload: {
        userId: getCurrentUserId(),
        textDescription,
        url
    }
});

export const doRedirect = redirectTo => ({
    type: 'DO_REDIRECT',
    payload: {redirectTo}
});

export const accessDenied = () => doRedirect("accessdenied");

export const redirectToLogin = () => doRedirect("login");

export const redirect = () => ({type: 'REDIRECT'});

const loadProducts = products => ({
    type: 'LOAD_PRODUCTS',
    payload: {products}
});

export const fetchProducts = () => dispatch =>
    getProducts(products => dispatch(loadProducts(products)));

const loadProductTrees = productTrees => ({
    type: "LOAD_PRODUCT_TREES",
    payload: {productTrees}
});

export const fetchProductTrees = () => dispatch =>
    getProductTrees(productTrees => dispatch(loadProductTrees(productTrees)));

export const setParentId = parentId => ({
    type: "SET_PARENT_ID",
    payload: {parentId}
});

export const setListView = () => ({
    type: "SET_LIST_VIEW"
});

export * from './categories';