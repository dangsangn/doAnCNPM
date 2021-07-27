import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  addAReviewSuccess,
  getReviewOfProductSuccess,
} from "../actions/review";
import { postReviewApi, getReviewOfProductApi } from "../api/reviewAPI";
import { ADD_A_REVIEW, GET_REVIEW_OF_PRODUCT } from "../constants/review";

function* addAReviewSaga({ payload }) {
  try {
    const res = yield call(postReviewApi, payload.data);
    if (res.status === 201) {
      yield put(addAReviewSuccess(res.data.reviews.reverse()));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getReviewOfProductSaga({ payload }) {
  try {
    const res = yield call(getReviewOfProductApi, payload.data);
    if (res.status === 200) {
      yield put(getReviewOfProductSuccess(res.data.reviews.reverse()));
    }
  } catch (error) {
    console.log(error);
  }
}

function* reviewSaga() {
  yield takeLatest(ADD_A_REVIEW, addAReviewSaga);
  yield takeEvery(GET_REVIEW_OF_PRODUCT, getReviewOfProductSaga);
}

export default reviewSaga;
