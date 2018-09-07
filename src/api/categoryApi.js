import {authorization} from "./token";

export const getCategories = next =>
    fetch(`/stock/categories`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorization()
        }
    })
        .then(response => response.json())
        .then(categories => next(categories));

export const getCategory = id => next =>
    fetch(`/stock/categories/${id}`, {headers: {...authorization()}})
        .then(response => response.json())
        .then(category => next(category));

export const insertCategory = category => next =>
    fetch('/stock/categories/', {
        method: 'put',
        body: JSON.stringify(category),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorization()
        }
    })
        .then(response => response.json())
        .then(category => next(category));

export const updateCategory = category => next =>
    fetch(`/stock/categories/${category.id}`, {
        method: 'post',
        body: JSON.stringify(category),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorization()
        }
    })
        .then(response => next(response));

export const addAttribute = (categoryId, attribute) => next =>
    fetch(`/stock/categories/${categoryId}/attributes`, {
        method: 'put',
        body: JSON.stringify(attribute),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorization()
        }
    })
        .then(response => next(response));