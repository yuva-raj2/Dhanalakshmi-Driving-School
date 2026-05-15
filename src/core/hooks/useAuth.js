import { useState, useEffect, useCallback } from 'react';
import api from '../../lib/axios';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/login', credentials);
      const { accessToken, user: userData, role } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify({ ...userData, role }));
      
      setToken(accessToken);
      setUser({ ...userData, role });
      setIsAuthenticated(true);
      
      return { success: true, user: { ...userData, role } };
    } catch (err) {
      const message = err?.message || err?.error || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await api.post('/auth/register', userData);
      return { success: true };
    } catch (err) {
      const message = err?.message || err?.error || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Refresh token (optional)
  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh');
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
      return { success: true };
    } catch (err) {
      logout();
      return { success: false, error: 'Session expired' };
    }
  }, [logout]);

  // Update user profile
  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
  };
}