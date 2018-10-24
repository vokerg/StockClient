import {getCategories, insertAttribute, removeAttribute, removeCategory} from "../api";
import {ADD_ATTRIBUTE, DELETE_ATTRIBUTE, DELETE_CATEGORY, LOAD_CATEGORIES} from "./actionTypes";

const loadCategories = categories => ({
    type: LOAD_CATEGORIES,
    payload: {categories}
});

export const fetchCategories = () => dispatch =>
    getCategories(categories => dispatch(loadCategories(categories)));

const addAttributeState = (categoryId, attribute) => ({
    type: ADD_ATTRIBUTE,
    payload: {categoryId, attribute}
});
export const addAttribute = (categoryId, attribute) => dispatch =>
    insertAttribute(categoryId, attribute)(result => dispatch(addAttributeState(categoryId, result)));

const deleteAttributeState = (categoryId, attributeId) => ({
    type: DELETE_ATTRIBUTE,
    payload: {categoryId, attributeId}
});
export const deleteAttribute = (categoryId, attributeId) => dispatch =>
    removeAttribute(categoryId, attributeId)(result => dispatch(deleteAttributeState(categoryId, attributeId)));

const deleteCategoryState = categoryId => ({
   type: DELETE_CATEGORY,
   payload: {categoryId}
});
export const deleteCategory = categoryId => dispatch =>
    removeCategory(id)(result => dispatch(deleteCategoryState(categoryId)));
