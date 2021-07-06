import { takeEvery, call, put } from "redux-saga/effects";
import { GET_INFOR_SHOP } from "../constants/shop";
import { getInfoShopApi } from "../api/shop";
import { getInforShopSuccess } from "../actions/shop";
import { hideLoading, showLoading } from "../actions/ui";

function* getInfoShopSaga({ payload }) {
  const { id, indexPage } = payload;
  yield put(showLoading());
  try {
    const res = yield call(getInfoShopApi, id, indexPage);
    console.log(res);
    const { data, status } = res;
    if (status === 200) {
      yield put(getInforShopSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
  yield put(hideLoading());
}
function* shopSaga() {
  yield takeEvery(GET_INFOR_SHOP, getInfoShopSaga);
}

export default shopSaga;
