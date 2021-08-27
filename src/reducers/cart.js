import {
  ADD_PRODUCT_TO_CART_SUCCESS,
  CLEAR_IS_PRODUCT_BOUGHT,
  DELETE_PRODUCT_LIST_WHEN_ORDERED,
  DELETE_PRODUCT_TO_CART_SUCCESS,
  GET_LIST_CART_SUCCESS,
  IS_PRODUCT_BOUGHT,
  UPDATE_PRODUCT_TO_CART_SUCCESS,
} from "../constants/cart";

const initialState = {
  listCart: [],
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_CART_SUCCESS:
      let getListCart = action.payload.data.map((item) => {
        return { ...item, quantity: item.count };
      });
      return { ...state, listCart: [...getListCart] };

    case ADD_PRODUCT_TO_CART_SUCCESS:
      const indexAdd = state.listCart.findIndex(
        (item) => item.id === action.payload.data.id
      );
      if (indexAdd === -1) {
        state.listCart.unshift(action.payload.data);
      } else {
        state.listCart[indexAdd].quantity += action.payload.data.quantity;
      }
      return {
        ...state,
      };

    case UPDATE_PRODUCT_TO_CART_SUCCESS:
      const indexUpdate = state.listCart.findIndex(
        (item) => item.id === action.payload.data.id
      );
      state.listCart[indexUpdate].quantity = action.payload.data.quantity;
      return { ...state };

    case DELETE_PRODUCT_TO_CART_SUCCESS:
      const newListCart = state.listCart.filter(
        (item) => item.id !== action.payload.data
      );
      return { ...state, listCart: newListCart };
    case IS_PRODUCT_BOUGHT:
      const indexProductSetBought = state.listCart.findIndex(
        (item) => item.id === action.payload.data.id
      );
      state.listCart[indexProductSetBought]["isBought"] =
        action.payload.data.isBought;
      return { ...state };

    case CLEAR_IS_PRODUCT_BOUGHT:
      const newClearListCart = state.listCart.map((item) => {
        return { ...item, isBought: false };
      });
      return { ...state, listCart: newClearListCart };

    case DELETE_PRODUCT_LIST_WHEN_ORDERED:
      const newProductAfterOrder = state.listCart.filter(
        (item) => item?.isBought !== true
      );
      return { ...state, listCart: newProductAfterOrder };

    default:
      return state;
  }
};

export default myReducer;
