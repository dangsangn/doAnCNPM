import * as actionTypes from "../constants/order";
export const addOrder = (data) => {
  return {
    type: actionTypes.ADD_ORDER,
    payload: { data },
  };
};

export const clearListOrder = () => {
  return {
    type: actionTypes.CLEAR_LIST_ORDER,
  };
};
