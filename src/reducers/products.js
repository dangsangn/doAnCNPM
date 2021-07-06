import * as actionTypes from "../constants/product";

let initialState = [];

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LIST:
      const newState = [...state, ...action.payload.products];
      return newState;

    default:
      return [...state];
  }
};

export default myReducer;
