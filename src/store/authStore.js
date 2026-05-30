import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken:
    localStorage.getItem("accessToken") || null,

  setAccessToken: (token) => {
    localStorage.setItem(
      "accessToken",
      token
    );

    set({
      accessToken: token,
    });
  },

  logout: () => {
    localStorage.removeItem(
      "accessToken"
    );

    set({
      accessToken: null,
    });
  },
}));

export default useAuthStore;