import { createContext, useContext } from "react";
import useAuthStore from "../store/authStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const {
    accessToken,
    setAccessToken,
    logout,
  } = useAuthStore();

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        logout,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);