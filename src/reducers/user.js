import * as actionTypes from "../constants/user";
let initialState = {
  isLogin: false,
  email: "",
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return { ...state, email: action.payload.data, isLogin: true };

    case actionTypes.GET_PROFILE_USER_SUCCESS:
      return {
        ...state,
        isLogin: true,
        ...action.payload.data,
      };

    case actionTypes.USER_LOGOUT_SUCCESS:
      return { isLogin: false, email: "" };

    default:
      return state;
  }
};

export default myReducer;
