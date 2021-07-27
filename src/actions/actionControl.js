import * as actionTypes from "../constants/actionControl";
export const getKeySearchProduct = (key) => {
  return {
    type: actionTypes.SEARCH_PRODUCT,
    payload: { data: key },
  };
};
