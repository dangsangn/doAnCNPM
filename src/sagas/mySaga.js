import { fork } from "redux-saga/effects";
import userSaga from "./user";
import shopSaga from "./shop";

function* rootSaga() {
  yield fork(userSaga);
  yield fork(shopSaga);
}

export default rootSaga;
