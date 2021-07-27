import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getProductsByKeySearchSuccess } from "../actions/productAction";
import { getProductByKeySearchApi } from "../api/actionControl";
import { SEARCH_PRODUCT } from "../constants/actionControl";

function* searchProductSaga({ payload }) {
  yield delay(500);
  try {
    const res = yield call(getProductByKeySearchApi, payload.data);
    yield put(getProductsByKeySearchSuccess(res.data.products));
  } catch (error) {
    console.log(error);
  }
}

function* productSaga() {
  yield takeLatest(SEARCH_PRODUCT, searchProductSaga);
}

export default productSaga;
