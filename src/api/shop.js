import { authGet } from "./axiosClient2";

export const getInfoShopApi = (id, indexPage) => {
  const url = `/users/shops/${id}?page=${indexPage}`;
  return authGet(url);
};
