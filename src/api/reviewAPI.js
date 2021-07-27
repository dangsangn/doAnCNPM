import { authGet, authPost } from "./axiosClient2";

export const postReviewApi = (data) => {
  const url = "/reviews";
  return authPost(url, data);
};

export const getReviewOfProductApi = (id) => {
  const url = `/products/${id}/reviews`;
  return authGet(url);
};
