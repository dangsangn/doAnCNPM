import * as actionTypes from "../constants/cart";

export const getListCart = () => {
  return {
    type: actionTypes.GET_LIST_CART,
  };
};

export const getListCartSuccess = (data) => {
  return {
    type: actionTypes.GET_LIST_CART_SUCCESS,
    payload: { data },
  };
};

export const addProductToCart = (data) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    payload: { data },
  };
};

export const addProductToCartSuccess = (data) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART_SUCCESS,
    payload: { data },
  };
};

export const updateProductToCart = (data) => {
  return {
    type: actionTypes.UPDATE_PRODUCT_TO_CART,
    payload: { data },
  };
};

export const updateProductToCartSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_PRODUCT_TO_CART_SUCCESS,
    payload: { data },
  };
};

export const deleteProductToCart = (data) => {
  return {
    type: actionTypes.DELETE_PRODUCT_TO_CART,
    payload: { data },
  };
};

export const deleteProductToCartSuccess = (data) => {
  return {
    type: actionTypes.DELETE_PRODUCT_TO_CART_SUCCESS,
    payload: { data },
  };
};

export const isProductBought = (data) => {
  return {
    type: actionTypes.IS_PRODUCT_BOUGHT,
    payload: { data },
  };
};

export const clearIsProductBought = () => {
  return {
    type: actionTypes.CLEAR_IS_PRODUCT_BOUGHT,
  };
};

export const deleteProductListWhenOrdered = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_LIST_WHEN_ORDERED,
  };
};
