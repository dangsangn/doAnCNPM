import axiosClient from "./axiosClient";

export const orderAPI = {
  get: () => {
    const url = "/orders";
    return axiosClient.get(url);
  },
  postOrder: (data) => {
    const url = "/orders";
    return axiosClient.post(url, data);
  },
  getOrderDetail: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
};
