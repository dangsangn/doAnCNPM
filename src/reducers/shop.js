import { GET_INFOR_SHOP_SUCCESS } from "../constants/shop";
const initialState = {};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFOR_SHOP_SUCCESS:
      return { ...action.payload.data };
    default:
      return state;
  }
};

export default myReducer;
