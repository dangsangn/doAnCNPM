import { authGet, authPatch, authPost } from "./axiosClient2";

export const orderAPI = {
  getListOrder: () => {
    const url = "/orders";
    return authGet(url);
  },
  postOrder: (data) => {
    const url = "/orders";
    return authPost(url, data);
  },
  getOrderDetail: (id) => {
    const url = `/orders/${id}`;
    return authGet(url);
  },
  cancelOrder: (id) => {
    const url = `/users/orders/${id}`;
    return authPatch(url);
  },
};
