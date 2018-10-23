export const getCategories = categories => categories;

const categories = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_CATEGORIES':
            return [...action.payload.categories];
        case 'ADD_ATTRIBUTE':
            return state.map(category =>
                (category.id === action.payload.categoryId) ?
                    {...category, categoryAttributes: [...category.categoryAttributes, action.payload.attribute]}
                    :
                    {...category})
        default:
            return state;
    }
}

export default categories;