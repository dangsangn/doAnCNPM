import { combineReducers } from "redux";
import cart from "./cart";
import keySearch from "./keySearch";
import order from "./order";
import popupForm from "./popup-form";
import productInCategory from "./product-in-category";
import products from "./products";
import user from "./user";
import shop from "./shop";
import ui from "./ui";
const rootReducer = combineReducers({
  products,
  cart,
  order,
  productInCategory,
  popupForm,
  user,
  keySearch,
  shop,
  ui,
});

export default rootReducer;
