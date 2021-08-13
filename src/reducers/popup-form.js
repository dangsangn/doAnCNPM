import * as actionTypes from "./../constants/action-types-popup-form";

let initialState = {
  isPopupRes: false,
  isPopupLogin: false,
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPUP_LOGIN_FORM:
      return { ...state, isPopupLogin: action.payload.value };
    case actionTypes.POPUP_REGISTER_FORM:
      return { ...state, isPopupRes: action.payload.value };
    default:
      return state;
  }
};

export default myReducer;
