import * as actionTypes from "../constants/product";

let initialState = {
  listProduct: [],
  listProductBySearch: [],
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LIST:
      const newState = {
        ...state,
        listProduct: [...state.listProduct, ...action.payload.products],
      };
      return newState;

    case actionTypes.GET_PRODUCT_BY_KEY_SEARCH_SUCCESS:
      return { ...state, listProductBySearch: [...action.payload.data] };

    default:
      return state;
  }
};

export default myReducer;
