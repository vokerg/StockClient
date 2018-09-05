import {authorization} from './token.js';

export const getProductTrees = next =>
    fetch('/stock/productTree')
        .then(response => response.json())
        .then(productTrees => next(productTrees));

export const getProductTree = id => next =>
    fetch(`/stock/productTree/${id}`, {headers:{...authorization()}})
        .then(response => response.json())
        .then(tree => next(tree));

export const insertProductTree = (productTree, parentId=0) => next =>
    fetch(`/stock/productTree/${parentId}`, {
        method: 'put',
        body: JSON.stringify(productTree),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorization()
        }
    })
        .then(response => next(response));

export const updateProductTree = productTree => next =>
    fetch(`/stock/productTree/${productTree.id}`, {
        method: 'post',
        body: JSON.stringify(productTree),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorization()
        }
    })
        .then(response => next(response));
