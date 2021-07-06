import axios from "axios";
import queryString from "query-string";
import { baseURL } from "./../constants/baseURL";
import history from "../utils/history";
//set up default config for http requests here
const axiosClient = axios.create({
  baseURL: baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    if (error.response) {
      if (error.response.status === 401) {
        history.push("/");
        clearAuth();
      }
    }
    return Promise.reject(error);
  }
);

function clearAuth() {
  localStorage.removeItem("authentication_token");
}

function authHeaders() {
  const token = localStorage.getItem("authentication_token");
  const headers = {
    Authorization: token,
    Accept: "application/json",
    "Accept-Language": "vi",
  };
  return headers;
}

export async function authGet(url) {
  return await axiosClient.get(url, { headers: authHeaders() });
}

export async function authPut(url, params = {}) {
  return await axiosClient.put(url, params, { headers: authHeaders() });
}

export async function authPatch(url, params = {}) {
  return await axiosClient.patch(url, params, { headers: authHeaders() });
}

export async function authPost(url, params = {}) {
  return await axiosClient.post(url, params, { headers: authHeaders() });
}

export async function authDelete(url) {
  return await axiosClient.delete(url, { headers: authHeaders() });
}

export default axiosClient;
