import axiosClient from "../api/axiosClient";

const authService = {
  login: async (payload) => {
    const response = await axiosClient.post(
      "/auth/login",
      payload
    );

    return response.data;
  },

  register: async (payload) => {
    const response = await axiosClient.post(
      "/auth/register",
      payload
    );

    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axiosClient.post(
      "/auth/forgot-password",
      { email }
    );

    return response.data;
  },
};

export default authService;