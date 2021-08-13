import axiosClient from "./axiosClient";
import { authGet } from "./axiosClient2";
const productApi = {
  getProducts: (params) => {
    const url = `/products?${params}`;
    return axiosClient.get(url);
  },
  get: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  getProductsDiscount: () => {
    const url = `/products_discount`;
    return axiosClient.get(url);
  },
  getProductListNewApi: () => {
    const url = "/products_new?page=0";
    return authGet(url);
  },
  getProductListRatingApi: (params) => {
    const url = `/products_rating?${params}`;
    return authGet(url);
  },
};

export default productApi;
