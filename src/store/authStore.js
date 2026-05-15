import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
          }
          
          const data = await response.json();
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          set({
            user: data.user,
            token: data.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },
      
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
          }
          
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },
      
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
        window.location.href = '/login';
      },
      
      // Load user from localStorage on init
      initialize: () => {
        const token = localStorage.getItem('accessToken');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          set({
            token,
            user: JSON.parse(user),
            isAuthenticated: true,
          });
        }
      },
      
      // Update user profile
      updateUser: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates },
        }));
        // Also update localStorage
        const currentUser = get().user;
        localStorage.setItem('user', JSON.stringify({ ...currentUser, ...updates }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);