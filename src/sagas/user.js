import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { popupLogin, popupRegister } from "../actions/popup-form";
import {
  getProfileUserSuccess,
  userLogoutSuccess,
} from "../actions/userAction";
import userAPI from "../api/userAPI";
import {
  GET_PROFILE_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "../constants/user";
import { toastError, toastSucces } from "../helpers/toastMessage";
import history from "../utils/history";

function* loginUserSaga({ payload }) {
  const sendData = payload.data;
  try {
    const res = yield call(userAPI.login, sendData);
    if (res.status === 200) {
      localStorage.setItem(
        "authentication_token",
        res.data.authentication_token
      );
      yield put(popupLogin(false));
    } else {
      toastError("Opp! Please try again!");
    }
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
    } else {
      toastError("Opp! Please try again!");
    }
  } catch (error) {
    console.log(error);
    toastError("Opp! Please try again!");
  }
}

function* getProfileUserSaga() {
  try {
    const res = yield call(userAPI.getProfileUser);
    const { data } = res;
    console.log(data);
    yield put(getProfileUserSuccess(data));
    toastSucces(`Welcome ${data.email}`);
  } catch (error) {
    console.log(error);
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
