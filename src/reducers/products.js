import * as actionTypes from "../constants/product";

let initialState = {
  listProduct: [],
  listProductBySearch: [],
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LIST:
      return {
        ...state,
        listProduct: [...action.payload.products],
      };

    case actionTypes.ADD_PRODUCTS_LIST:
      return {
        ...state,
        listProduct: [...state.listProduct, ...action.payload.products],
      };

    case actionTypes.GET_PRODUCT_BY_KEY_SEARCH_SUCCESS:
      return { ...state, listProductBySearch: [...action.payload.data] };

    default:
      return state;
  }
};

export default myReducer;
