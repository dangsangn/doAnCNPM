import {
  ADD_A_REVIEW_SUCCESS,
  GET_REVIEW_OF_PRODUCT_SUCCESS,
} from "../constants/review";
const initialState = [];

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW_OF_PRODUCT_SUCCESS:
      return [...action.payload.data];

    case ADD_A_REVIEW_SUCCESS:
      return [...action.payload.data];
    default:
      return state;
  }
};

export default myReducer;
