import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  addProductToCartSuccess,
  deleteProductToCartSuccess,
  getListCartSuccess,
  updateProductToCartSuccess,
} from "../actions/cartAction";
import {
  addProductToCartApi,
  deleteProductToCartApi,
  getListCartApi,
  updateProductToCartApi,
} from "../api/cartAPI";
import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_TO_CART,
  GET_LIST_CART,
  UPDATE_PRODUCT_TO_CART,
} from "../constants/cart";

function* addProductToCartSaga({ payload }) {
  try {
    const res = yield call(addProductToCartApi, {
      product_id: payload.data.id,
      count: payload.data.quantity,
    });
    if (res.status === 200) {
      yield put(addProductToCartSuccess(payload.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getListCartSaga() {
  try {
    const res = yield call(getListCartApi);
    yield put(getListCartSuccess(res.data.products));
  } catch (error) {
    console.log(error);
  }
}

function* updateProductToCartSaga({ payload }) {
  try {
    yield call(updateProductToCartApi, {
      product_id: payload.data.id,
      count: payload.data.quantity,
    });
    yield put(updateProductToCartSuccess(payload.data));
  } catch (error) {
    console.log(error);
  }
}

function* deleteProductSaga({ payload }) {
  try {
    yield call(deleteProductToCartApi, payload.data);
    yield put(deleteProductToCartSuccess(payload.data));
  } catch (error) {
    console.log(error);
  }
}

function* cartSaga() {
  yield takeEvery(GET_LIST_CART, getListCartSaga);
  yield takeLatest(ADD_PRODUCT_TO_CART, addProductToCartSaga);
  yield takeEvery(UPDATE_PRODUCT_TO_CART, updateProductToCartSaga);
  yield takeLatest(DELETE_PRODUCT_TO_CART, deleteProductSaga);
}

export default cartSaga;
