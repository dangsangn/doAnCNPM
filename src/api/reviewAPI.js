import axiosClient from "./axiosClient";

const reviewAPI = {
  postReview: (data) => {
    const url = "/reviews";
    return axiosClient.post(url, data);
  },
};

export default reviewAPI;
