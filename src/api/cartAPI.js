import { authDelete, authGet, authPost, authPut } from "./axiosClient2";

export const getListCartApi = () => {
  const url = "/carts";
  return authGet(url);
};

export const addProductToCartApi = (data) => {
  const url = "/carts";
  return authPost(url, data);
};

export const deleteProductToCartApi = (data) => {
  const url = "/carts";
  return authDelete(url, data);
};

export const updateProductToCartApi = (data) => {
  const url = "/carts";
  return authPut(url, data);
};
