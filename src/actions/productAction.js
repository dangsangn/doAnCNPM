import * as actionTypes from "./../constants/product";

export const fetchProductsList = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_LIST,
    payload: {
      products,
    },
  };
};

export const getProductsByKeySearch = () => {
  return {
    type: actionTypes.GET_PRODUCT_BY_KEY_SEARCH,
  };
};

export const getProductsByKeySearchSuccess = (products) => {
  return {
    type: actionTypes.GET_PRODUCT_BY_KEY_SEARCH_SUCCESS,
    payload: {
      data: products,
    },
  };
};
