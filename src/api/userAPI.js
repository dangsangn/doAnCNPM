import axiosClient from "./axiosClient";
import { authGet, authPost } from "./axiosClient2";

const userAPI = {
  login: (data) => {
    const url = "/users/login";
    return authPost(url, data);
  },

  register: (data) => {
    const url = "/users/signup";
    return authPost(url, data);
  },

  getProfileUser: () => {
    const url = "/profile";
    return authGet(url);
  },

  updateProfile: (data) => {
    const url = "/profile";
    const params = data;
    return axiosClient.patch(url, params);
  },
  updatePassword: (data) => {
    const url = "/users/password";
    return axiosClient.put(url, data);
  },
};

export default userAPI;
