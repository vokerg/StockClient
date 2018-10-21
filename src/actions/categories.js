import {getCategories, insertAttribute, removeAttribute, removeCategory} from "../api";

const loadCategories = categories => ({
    type: 'LOAD_CATEGORIES',
    payload: {categories}
});

export const fetchCategories = () => dispatch =>
    getCategories(categories => dispatch(loadCategories(categories)));

const addAttributeState = (categoryId, attribute) => ({
    type: 'ADD_ATTRIBUTE',
    payload: {categoryId, attribute}
})

export const addAttribute = (categoryId, attribute) => dispatch =>
    insertAttribute(categoryId, attribute)(result => dispatch(addAttributeState(categoryId, result)));
