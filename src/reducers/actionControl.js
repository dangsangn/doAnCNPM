import * as actionTypes from "../constants/actionControl";
let initialState = {
  page: 0,
  name_find: "",
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_PRODUCT:
      return { ...state, name_find: action.payload.data };
    default:
      return { ...state };
  }
};

export default myReducer;
