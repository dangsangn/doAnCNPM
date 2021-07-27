import {
  ADD_A_REVIEW,
  ADD_A_REVIEW_SUCCESS,
  GET_REVIEW_OF_PRODUCT,
  GET_REVIEW_OF_PRODUCT_SUCCESS,
} from "../constants/review";

export const getReviewOfProduct = (id) => {
  return {
    type: GET_REVIEW_OF_PRODUCT,
    payload: { data: id },
  };
};
export const getReviewOfProductSuccess = (data) => {
  return {
    type: GET_REVIEW_OF_PRODUCT_SUCCESS,
    payload: { data },
  };
};

export const addAReview = (data) => {
  return {
    type: ADD_A_REVIEW,
    payload: { data },
  };
};

export const addAReviewSuccess = (data) => {
  return {
    type: ADD_A_REVIEW_SUCCESS,
    payload: { data },
  };
};
