import * as actionTypes from "../constants/user";

export const userLogin = (data) => {
  return {
    type: actionTypes.USER_LOGIN,
    payload: { data },
  };
};

export const userLoginSuccess = (data) => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: { data },
  };
};

export const userLoginFail = (error) => {
  return {
    type: actionTypes.USER_LOGIN_FAIL,
    payload: { data: error },
  };
};

export const userRegister = (data) => {
  return {
    type: actionTypes.USER_REGISTER,
    payload: { data },
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

export const userLogoutSuccess = () => {
  return {
    type: actionTypes.USER_LOGOUT_SUCCESS,
  };
};

export const getProfileUser = (data) => {
  return {
    type: actionTypes.GET_PROFILE_USER,
  };
};

export const getProfileUserSuccess = (data) => {
  return {
    type: actionTypes.GET_PROFILE_USER_SUCCESS,
    payload: { data },
  };
};
export const getProfileUserFail = (error) => {
  return {
    type: actionTypes.GET_PROFILE_USER_FAIL,
    payload: { data: error },
  };
};
