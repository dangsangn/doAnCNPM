import * as actionTypes from "../constants/order";
let initialState = sessionStorage.getItem("listOrder")
  ? JSON.parse(sessionStorage.getItem("listOrder"))
  : [];

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      sessionStorage.setItem("listOrder", JSON.stringify(action.payload.data));
      return [...action.payload.data];
    case actionTypes.CLEAR_LIST_ORDER:
      sessionStorage.removeItem("listOrder");
      return [];
    default:
      return state;
  }
};

export default myReducer;
