import React, { createContext, useContext, useMemo } from 'react';
import { useAuth as useAuthHook } from '../hooks/useAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthHook();
  
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => auth, [
    auth.user,
    auth.token,
    auth.isAuthenticated,
    auth.isLoading,
    auth.error,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;