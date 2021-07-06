import { GET_INFOR_SHOP, GET_INFOR_SHOP_SUCCESS } from "../constants/shop";

export const getInfoShop = (id, indexPage) => {
  return {
    type: GET_INFOR_SHOP,
    payload: { id, indexPage },
  };
};

export const getInforShopSuccess = (data) => {
  return {
    type: GET_INFOR_SHOP_SUCCESS,
    payload: { data },
  };
};
