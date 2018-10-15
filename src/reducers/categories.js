export const getCategories = categories => categories;

const categories = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_CATEGORIES': return [...action.payload.categories];
        default: return state;
    }
}

export default categories;