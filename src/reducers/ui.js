import * as ActionTypes from "../constants/ui";
let initialState = {
  showLoading: false,
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADING:
      return { ...state, showLoading: true };
    case ActionTypes.HIDE_LOADING:
      return { ...state, showLoading: false };
    default:
      return state;
  }
};

export default myReducer;
