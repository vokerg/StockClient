import {getCategories} from "../api";

const loadCategories = categories => ({
    type: 'LOAD_CATEGORIES',
    payload: {categories}
});

export const fetchCategories = () => dispatch =>
    getCategories(categories => dispatch(loadCategories(categories)));