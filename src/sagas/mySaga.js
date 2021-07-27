import { fork } from "redux-saga/effects";
import userSaga from "./user";
import shopSaga from "./shop";
import productSaga from "./product";
import cartSaga from "./cart";
import reviewSaga from "./review";

function* rootSaga() {
  yield fork(userSaga);
  yield fork(shopSaga);
  yield fork(productSaga);
  yield fork(cartSaga);
  yield fork(reviewSaga);
}

export default rootSaga;
