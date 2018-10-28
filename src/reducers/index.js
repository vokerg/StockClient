import {combineReducers} from 'redux';

import userData, * as fromUserData from './userData';
import draftDocuments, * as fromDraftDocuments from './draftDocuments';
import products, * as fromProducts from './products';
import common, * as fromCommon from './common';
import categories, * as fromCategories from './categories';

export default combineReducers({userData, draftDocuments, products, common, categories});

export const getCurrentUser = state => fromUserData.getCurrentUser(state.userData);
export const getCurrentUserId = state => fromUserData.getCurrentUserId(state.userData);
export const getAuthorizationToken = state => fromUserData.getAuthorizationToken(state.userData);
export const getDraftsList = state => fromDraftDocuments.getDraftsList(state.draftDocuments);
export const getDraft = (state, draftId) => fromDraftDocuments.getDraft(state.draftDocuments, draftId);
export const getProducts = state => fromProducts.getProducts(state.products);
export const getParentId = state => fromProducts.getParentId(state.products);
export const getPreviousParentId = (state, parentId) => fromProducts.getPreviousParentId(state.products, parentId);
export const getProductsByCurrentParentId = state => fromProducts.getProductsByCurrentParentId(state.products);
export const getProduct = (state, id) => fromProducts.getProduct(state.products, id);
export const getRedirectTo = state => fromCommon.getRedirectTo(state.common);
export const getProductTrees = state => fromProducts.getProductTrees(state.products);
export const getIsListView = state => fromProducts.getIsListView(state.products);
export const getCategories = state => fromCategories.getCategories(state.categories);
export const getCategory = (state, id) => fromCategories.getCategory(state.categories, id);
