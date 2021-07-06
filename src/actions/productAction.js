import * as actionTypes from "./../constants/product";

export const fetchProductsList = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_LIST,
    payload: {
      products,
    },
  };
};
