import { authGet } from "./axiosClient2";

export const getProductByKeySearchApi = (key) => {
  const url = `/search?name_find=${key}&page=0`;
  return authGet(url);
};
