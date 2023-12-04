import axios from "axios";
import Cookies from "js-cookie";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Create an instance of Axios
const api = axios.create({
  baseURL: SERVER_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add headers to all requests
    config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Log out the user or perform any other action
      console.error("auth error" + error.response);

      // TODO refresh the token

      Cookies.remove("token");
      console.log("User logged out due to 401 response");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export async function register(payload) {
  try {
    const { data } = await api.post(`/auth/register`, payload);

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function login(email, password) {
  try {
    const { data } = await api.post(`/auth/login`, { email, password });

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function postAutomation(payload) {
  try {
    const { data } = await api.post(`/automations`, payload);

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAutomations() {
  try {
    const { data } = await api.get(`/automations`);
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAutomationById(automationId) {
  console.log(SERVER_URL);
  try {
    const { data } = await api.get(`/automations/${automationId}`);
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await api.get(`${SERVER_URL}/self/me`);
    // console.log("user", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getWallet() {
  try {
    const { data } = await api.get(`${SERVER_URL}/self/wallet`);

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
