import {ADD_ATTRIBUTE, DELETE_ATTRIBUTE, DELETE_CATEGORY, LOAD_CATEGORIES} from "../actions/actionTypes";

export const getCategories = categories => categories;

const categories = (state = [], action) => {
    const {payload} = action;
    switch (action.type) {
        case LOAD_CATEGORIES:
            return [...payload.categories];
        case ADD_ATTRIBUTE: {
            const {categoryId, attribute} = payload;
            return state.map(category =>
                (category.id === categoryId) ?
                    {...category, categoryAttributes: [...category.categoryAttributes, attribute]}
                    :
                    {...category});
        }
        case DELETE_CATEGORY: {
            const {categoryId} = payload;
            return state.filter(category => category.id !== categoryId);
        }

        case DELETE_ATTRIBUTE: {
            const {categoryId, attributeId} = action.payload;
            return state.map(category =>
                category.id !== categoryId ? {...category}
                    : {...category, categoryAttributes: category.categoryAttributes.filter(attribute => attribute.id !== attributeId)}
            );
        }

        default:
            return state;
    }
}

export default categories;