import { authGet, authPatch, authPost, authPut } from "./axiosClient2";

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
    return authPatch(url, params);
  },
  updatePassword: (data) => {
    const url = "/users/password";
    return authPut(url, data);
  },
};

export default userAPI;
