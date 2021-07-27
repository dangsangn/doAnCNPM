import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { popupLogin, popupRegister } from "../actions/popup-form";
import { toastSucces, toastError } from "../helpers/toastMessage";
import userAPI from "../api/userAPI";
import history from "../utils/history";

import {
  GET_PROFILE_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "../constants/user";
import {
  getProfileUserSuccess,
  userLoginSuccess,
  userLogoutSuccess,
} from "../actions/userAction";

function* loginUserSaga({ payload }) {
  const sendData = payload.data;
  try {
    const res = yield call(userAPI.login, sendData);
    localStorage.setItem("authentication_token", res.data.authentication_token);
    const { data } = res;
    yield put(userLoginSuccess(data.email));
    yield put(popupLogin(false));
    toastSucces(`Welcome ${data.email}`);
  } catch (error) {
    toastError("Opp! Please try again!");
    console.log(error);
  }
}

function* registerUserSaga({ payload }) {
  const sendData = payload.data;
  try {
    const res = yield call(userAPI.register, sendData);
    const { status } = res;
    if (status === 201) {
      toastSucces("Register successfully!");
      yield put(popupRegister(false));
      yield put(popupLogin(true));
    }
  } catch (error) {
    toastError("Opp! Please try again!");
    console.log(error);
  }
}

function* getProfileUserSaga() {
  const token = localStorage.getItem("authentication_token");
  if (token) {
    try {
      const res = yield call(userAPI.getProfileUser);
      const { data } = res;
      yield put(getProfileUserSuccess(res.data));
      toastSucces(`Welcome ${data.email}`);
    } catch (error) {}
  }
}

function* logoutUserSaga() {
  localStorage.removeItem("authentication_token");
  yield put(userLogoutSuccess());
  history.push("/");
}

function* userSaga() {
  yield takeLatest(USER_LOGIN, loginUserSaga);
  yield takeLatest(USER_REGISTER, registerUserSaga);
  yield takeEvery(GET_PROFILE_USER, getProfileUserSaga);
  yield takeLatest(USER_LOGOUT, logoutUserSaga);
}

export default userSaga;
